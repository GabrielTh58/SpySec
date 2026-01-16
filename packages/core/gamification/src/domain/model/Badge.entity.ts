import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Validator } from "@spysec/utils";
import { Slug } from "@spysec/shared";

export interface BadgeProps extends EntityProps {
  slug: Slug;
  name: string;
  description: string;  
  iconUrl: string;
  condition?: string;   
}

export interface CreateBadgeInput{
    slug: string;
    name: string;
    description: string;
    iconUrl: string
}

export interface RestoreBadgeProps {
    id: string;
    slug: string;
    name: string;
    description: string;
    iconUrl: string;
    condition?: string;
}

export class Badge extends Entity<Badge, BadgeProps> {
  private constructor(props: BadgeProps, id: Id) {
    super(id, props);
  }

  static create(props: CreateBadgeInput): Result<Badge> {
    const errors = [ 
        Validator.notNullOrEmpty("NAME_REQUIRED", props.name),
        Validator.notNullOrEmpty("DESCRIPTION_REQUIRED", props.description),
        Validator.notNullOrEmpty("iCON_REQUIRED", props.iconUrl),    
    ];
  
    const validErrors = errors.filter((e): e is string => e !== null);
    if (validErrors.length > 0) return Result.fail<Badge>(validErrors[0]!);

    const slugResult = Slug.create(props.slug)
    if(slugResult.failed) return Result.fail<Badge>(slugResult.errors)
    
    return Result.ok(new Badge({
        ...props, 
        slug: slugResult.value!
    }, Id.generate()));
  }

  static restore(props: RestoreBadgeProps): Result<Badge> {
    const slug = Slug.restore(props.slug); 
    const id = Id.restore(props.id);

    return Result.ok(
      new Badge(
        {
          ...props,
          slug: slug,
        },
        id
      )
    );
  }

  get slug() { return this.props.slug; }
  get name() { return this.props.name; }
  get description() { return this.props.description; }
  get iconUrl() { return this.props.iconUrl; }
  get condition() { return this.props.condition; }
}