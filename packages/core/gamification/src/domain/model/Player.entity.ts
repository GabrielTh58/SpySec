import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Validator } from "@spysec/utils";
import { ProfileType } from "@spysec/auth";

interface PlayerProps extends EntityProps {
  userId: string;
  nickname: string;
  type: ProfileType;
  currentLevel: number;
  currentXp: number;
  streak: number;
  badges: string[]
  maxStreak: number; 
  playedCategories: string[]; 
  lastActivityDate: Date | null;
  completedMissionsCount: number
  totalStudySeconds: number
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlayerInput {
  userId: string;
  nickname: string;
  type: ProfileType;
}

export interface RestorePlayerProps { 
  id: string;
  userId: string;
  nickname: string;
  type: string;
  currentLevel: number;
  currentXp: number;
  streak: number;
  badges: string[]
  maxStreak: number; 
  playedCategories: string[]; 
  lastActivityDate: Date | null;
  completedMissionsCount: number;
  totalStudySeconds: number
  createdAt: Date | string;
  updatedAt: Date | string;
}

export class Player extends Entity<Player, PlayerProps> {
  private constructor(props: PlayerProps, id: Id) {
    super(id, props);
  }

  static create(props: CreatePlayerInput): Result<Player> {
    const errors = [
      Validator.notNullOrEmpty("ACCOUNT_ID_REQUIRED", props.userId),
      Validator.notNullOrEmpty("NICKNAME_REQUIRED", props.nickname),
    ];

    const validErrors = errors.filter((e): e is string => e !== null);
    if (validErrors.length > 0) return Result.fail<Player>(validErrors[0]!);

    return Result.ok(
      new Player(
        {
          userId: props.userId,
          nickname: props.nickname,
          type: props.type,
          currentLevel: 1, 
          currentXp: 0,  
          streak: 0,
          badges: [],
          maxStreak: 0,
          playedCategories: [],   
          completedMissionsCount: 0,
          lastActivityDate: null,
          totalStudySeconds: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        Id.generate()
      )
    );
  }

  static restore(props: RestorePlayerProps): Result<Player> {
    return Result.ok(
      new Player(
        {
          ...props,
          type: props.type as ProfileType,
          createdAt: new Date(props.createdAt),
          updatedAt: new Date(props.updatedAt),
        },
        Id.restore(props.id)
      )
    );
  }

  private clone(changes: Partial<PlayerProps>): Player {
    return new Player(
      { ...this.props, ...changes, updatedAt: new Date() },
      this.id 
    );
  }
  
  addXp(amount: number): Result<Player> {
    if (amount < 0) return Result.fail("XP_CANNOT_BE_NEGATIVE");
    return Result.ok(this.clone({ currentXp: this.props.currentXp + amount, updatedAt: new Date() }));
  }

  levelUp(): Player {
    return this.clone({ currentLevel: this.props.currentLevel + 1,  updatedAt: new Date() });
  }

  changeProfileType(newType: ProfileType): Player {
    return this.clone({ type: newType });
  }

  registerActivity(): Player {
    const now = new Date();
    const last = this.props.lastActivityDate;
  
    if (!last) {
      return this.clone({ 
        streak: 1, 
        maxStreak: 1,
        lastActivityDate: now 
      });
    }
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDate = new Date(last.getFullYear(), last.getMonth(), last.getDate());

    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 0) {
      return this.clone({ lastActivityDate: now });
    }

    if (diffDays === 1) {
      const newStreak = this.props.streak + 1;
      const newMaxStreak = Math.max(this.props.maxStreak, newStreak);

      return this.clone({ 
        streak: newStreak,
        maxStreak: newMaxStreak,
        lastActivityDate: now 
      }); 
    }

    const newMaxStreak = Math.max(this.props.maxStreak, this.props.streak);

    return this.clone({ 
      streak: 1,
      maxStreak: newMaxStreak,
      lastActivityDate: now 
    });
  }

  hasBadge(badgeSlug: string): boolean {
    return this.props.badges.includes(badgeSlug);
  } 

  awardBadge(badgeSlug: string): Player {
    if (this.hasBadge(badgeSlug)) {
      return this; 
    }
        
    return this.clone({ badges: [...this.props.badges, badgeSlug] });    
  }

  incrementCompletedMissions(): void {
    if (!this.props.completedMissionsCount) {
        this.props.completedMissionsCount = 0;
    }
    this.props.completedMissionsCount++;
  }

  addStudyTime(seconds: number): void {
    if (!this.props.totalStudySeconds) {
        this.props.totalStudySeconds = 0;
    }
    this.props.totalStudySeconds += seconds;
}

  addCategoryHistory(category: string): Player {
    if (this.props.playedCategories.includes(category)) return this;
    return this.clone({ 
        playedCategories: [...this.props.playedCategories, category] 
  }); 
}

  get userId() { return this.props.userId; } 
  get nickname() { return this.props.nickname; }
  get currentLevel() { return this.props.currentLevel; }
  get currentXp() { return this.props.currentXp; }
  get type() { return this.props.type; }
  get streak(): number { return this.props.streak }
  get maxStreak(): number { return this.props.  maxStreak }
  get playedCategories() { return this.props.playedCategories; }
  get badges() { return this.props.badges }
  get lastActivityDate() { return this.props.lastActivityDate }
  get createdAt() { return this.props.createdAt }
  get completedMissionsCount(): number { return this.props.completedMissionsCount }
  get totalStudySeconds(): number { return this.props.totalStudySeconds || 0 }
}