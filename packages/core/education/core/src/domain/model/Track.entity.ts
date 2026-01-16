import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Slug } from "@spysec/shared";
import { Validator } from "@spysec/utils";
import { Mission } from "./Mission.entity";

export enum TrackVisibility {
  PERSONAL = "PERSONAL",
  CORPORATE = "CORPORATE",
  ALL = "ALL"
}

export enum TrackDifficulty {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}

export interface TrackProps extends EntityProps {
  title: string;
  slug: Slug;
  description: string;
  iconUrl: string;
  difficulty: TrackDifficulty;
  targetProfile: TrackVisibility;
  prerequisiteTrackId?: string | null;
  isActive: boolean;
  minLevel: number;
  missions: Mission[] 
  createdAt: Date;
  updatedAt: Date;  
}

export interface CreateTrackInputDTO {
  title: string;
  description: string;
  iconUrl: string;
  minLevel?: number;
  prerequisiteTrackId?: string | null;
  difficulty: TrackDifficulty;
  targetProfile: TrackVisibility;
}

export interface RestoreTrackProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconUrl: string;
  difficulty: string;
  targetProfile: string;
  isActive: boolean;
  minLevel: number;
  prerequisiteTrackId?: string | null;
  missions?: Mission[]
  createdAt: Date;
  updatedAt: Date;
}

export class Track extends Entity<Track, TrackProps> {
  private constructor(props: TrackProps, id: Id) {
    super(id, props);
  }

  static create(props: CreateTrackInputDTO): Result<Track> {
    const errors = [
      Validator.notNullOrEmpty("TITLE_IS_REQUIRED", props.title),
      Validator.notNullOrEmpty("DESCRIPTION_IS_REQUIRED", props.description),
      Validator.notNullOrEmpty("ICON_URL_IS_REQUIRED", props.iconUrl),
      Validator.notNullOrEmpty("DIFFICULTY_IS_REQUIRED", props.difficulty),
      props.minLevel !== undefined
        ? Validator.greaterThanOrEqual(
            "LEVEL_MUST_BE_POSITIVE",
            props.minLevel,
            0
          )
        : null,
    ];

    const validErrors = errors.filter((e): e is string => e !== null);

    if (validErrors.length > 0) {
      return Result.fail<Track>(validErrors[0]!);
    }
    const slugResult = Slug.create(props.title);
    if (slugResult.failed) return Result.fail<Track>(slugResult.errors);

    if (props.minLevel && props.minLevel < 0) {
      return Result.fail("MIN_LEVEL_CANNOT_BE_NEGATIVE");
    }

    return Result.ok(
      new Track(
        {
          title: props.title,
          slug: slugResult.value!,
          description: props.description,
          iconUrl: props.iconUrl,
          minLevel: props.minLevel || 0,
          prerequisiteTrackId: props.prerequisiteTrackId || null,
          difficulty: props.difficulty,
          targetProfile: props.targetProfile,
          isActive: true,
          missions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        Id.generate()
      )
    );
  }

  static restore(props: RestoreTrackProps): Result<Track> { 
    const slug = Slug.restore(props.slug); 
    const id = Id.restore(props.id);
    
    return Result.ok(
      new Track(
        {
          ...props,
          slug: slug,          
          difficulty: props.difficulty as TrackDifficulty,
          targetProfile: props.targetProfile as TrackVisibility,          
          missions: props.missions ?? [],
          createdAt: props.createdAt instanceof Date ? props.createdAt : new Date(props.createdAt),
          updatedAt: props.updatedAt instanceof Date ? props.updatedAt : new Date(props.updatedAt),
        },
        id
      )
    );
  }

  private clone(changes: Partial<TrackProps>): Track {
    return new Track(
      {
        ...this.props,
        ...changes,
        updatedAt: new Date(),
      },
      this.id as Id
    );
  }

  updateTitle(newTitle: string): Result<Track> {
    const slugResult = Slug.create(newTitle);
    if (slugResult.failed) return Result.fail(slugResult.errors);

    return Result.ok(
      this.clone({
        title: newTitle,
        slug: slugResult.value,
      })
    );
  }

  changeTargetProfile(newTarget: TrackVisibility): Track {
    return this.clone({ targetProfile: newTarget });
  }

  isLocked(
    completedTrackIds: string[],
    userCurrentLevel: number
  ): { locked: boolean; reason?: "LEVEL" | "PREREQUISITE" } {    
    if (userCurrentLevel < this.props.minLevel) {
      return { locked: true, reason: "LEVEL" };
    }
    if (this.props.prerequisiteTrackId) {
      const requirementMet = completedTrackIds.includes(
        this.props.prerequisiteTrackId
      );
      if (!requirementMet) {
        return { locked: true, reason: "PREREQUISITE" };
      }
    }

    return { locked: false };
  }

  deactivate(): Track {
    return this.clone({ isActive: false });
  }

  activate(): Track {
    return this.clone({ isActive: true });
  }

  isVisibleTo(userProfile: string): boolean { 
    if (!this.props.isActive) return false;    
    if (this.props.targetProfile === TrackVisibility.ALL) return true;

    return this.props.targetProfile.toString() === userProfile;
}

  get slug() { return this.props.slug.value; }
  get isActive() { return this.props.isActive; }
  get title() { return this.props.title; }
  get iconUrl() { return this.props.iconUrl; }
  get description(): string { return this.props.description; }
  get targetProfile() { return this.props.targetProfile; }
  get difficulty() { return this.props.difficulty; }
  get minLevel() { return this.props.minLevel; }
  get prerequisiteTrackId() { return this.props.prerequisiteTrackId; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }
  get missions() {return this.props.missions }
}
