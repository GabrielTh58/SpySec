import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import {
  MissionContent,
  MissionBlock,
} from "../value-objects/MissionContent.vo";
import { Validator } from "@spysec/utils";
import { Slug } from "@spysec/shared";

export interface MissionProps extends EntityProps {
  trackId: string;
  title: string;
  description: string;
  iconUrl: string;
  slug: Slug;
  xpReward: number;
  order: number;
  category: string;
  estimatedTime: number; 
  content: MissionContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMissionInputDTO {  
  id?: string;
  trackId: string;
  title: string;
  description: string;
  iconUrl: string;
  xpReward: number;
  order: number;
  category: string;
  estimatedTime: number;
  content: MissionBlock[];
}

export interface RestoreMissionProps {
  id: string;
  trackId: string;
  title: string;
  slug: string
  iconUrl: string
  description: string;
  xpReward: number;
  order: number;
  category: string;
  estimatedTime: number;
  content: MissionBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export type MissionStatus = "LOCKED" | "AVAILABLE" | "COMPLETED";

export class Mission extends Entity<Mission, MissionProps> {
  private constructor(props: MissionProps, id: Id) {
    super(id, props);
  }

  static create(props: CreateMissionInputDTO): Result<Mission> {
    const errors = [
      Validator.notNullOrEmpty("TRACK_ID_IS_REQUIRED", props.trackId),
      Validator.notNullOrEmpty("ICON_IS_REQUIRED", props.iconUrl),
      Validator.notNullOrEmpty("TITLE_IS_REQUIRED", props.title),
      Validator.notNullOrEmpty("DESCRIPTION_IS_REQUIRED", props.description),
      Validator.notNullOrEmpty("CATEGORY_IS_REQUIRED", props.category),
      Validator.greaterThan("XP_REWARD_MUST_BE_POSITIVE", props.xpReward, 0),
      Validator.greaterThanOrEqual("ORDER_CANNOT_BE_NEGATIVE", props.order, 0),
    ];

    const validErrors = errors.filter((e): e is string => e !== null);
    if (validErrors.length > 0) {
      return Result.fail<Mission>(validErrors[0]!);
    } 

    const slugResult = Slug.create(props.title);
    if (slugResult.failed) return Result.fail<Mission>(slugResult.errors);

    const contentResult = MissionContent.create(props.content);
    if (contentResult.failed) return Result.fail<Mission>(contentResult.errors);

    if (props.xpReward <= 0) return Result.fail("XP Reward must be positive.");
    if (props.order < 0) return Result.fail("Order cannot be negative.");

    const uniqueId = props.id ? Id.restore(props.id) : Id.generate();

    return Result.ok(
      new Mission(
        {
          trackId: props.trackId,
          slug: slugResult.value!,
          title: props.title,
          description: props.description,
          iconUrl: props.iconUrl,
          xpReward: props.xpReward,
          order: props.order,
          category: props.category,
          estimatedTime: props.estimatedTime,
          content: contentResult.value!,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        uniqueId
      )
    );
  }

  static restore(props: RestoreMissionProps): Result<Mission> {    
    const id = Id.restore(props.id); 
    const slug = Slug.restore(props.slug);
    const content = MissionContent.restore(props.content);
    
    return Result.ok(
      new Mission(
        {
          ...props,
          slug,       
          content
        },
        id 
      )
    );
  }
  
  private clone(changes: Partial<MissionProps>): Mission {
    return new Mission(
      {
        ...this.props,
        ...changes,
        updatedAt: new Date(),
      },
      this.id as Id
    );
  }

  updateContent(newBlocks: MissionBlock[]): Result<Mission> {
    const contentResult = MissionContent.create(newBlocks);
    if (contentResult.failed) return Result.fail(contentResult.errors);

    return Result.ok(this.clone({ content: contentResult.value }));
  }

  changeOrder(newOrder: number): Result<Mission> {
    if (newOrder < 0) return Result.fail("Order must be positive");
    return Result.ok(this.clone({ order: newOrder }));
  }

  /**
   * Calcula o status dinâmico desta missão para um usuário específico.
   * @param lastCompletedOrder A ordem da última missão que o usuário terminou nesta trilha.
   * Ex: Se o usuário terminou a missão 2, a missão 3 fica AVAILABLE, a 4 fica LOCKED.
   */
  calculateStatus(lastCompletedOrder: number): MissionStatus {
    if (this.props.order <= lastCompletedOrder) {
      return "COMPLETED";
    }
    if (this.props.order === lastCompletedOrder + 1) {
      return "AVAILABLE";
    }
    return "LOCKED";
  }
  
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get iconUrl() { return this.props.iconUrl; }
  get content() { return this.props.content; }
  get blocks() { return this.props.content.value; }
  get xpReward() { return this.props.xpReward; }
  get trackId() { return this.props.trackId; }
  get order() { return this.props.order; }
  get slug() { return this.props.slug.value; }
  get category() { return this.props.category; }
  get estimatedTime() { return this.props.estimatedTime; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }
}
