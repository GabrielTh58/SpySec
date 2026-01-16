import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Validator } from "@spysec/utils";

export interface LevelProps extends EntityProps {
  levelNumber: number;
  xpRequired: number;
  title: string;
}

export interface CreateLevelInput {
  levelNumber: number;
  xpRequired: number;
  title: string;
}

export interface RestoreLevelProps {
  id: string;
  levelNumber: number;
  xpRequired: number;
  title: string;
}

export class Level extends Entity<Level, LevelProps> {
  private constructor(props: LevelProps, id: Id) {
    super(id, props);
  }

  static create(props: CreateLevelInput): Result<Level> {
    const errors = [
      Validator.notNullOrEmpty("TITLE_IS_REQUIRED", props.title),
      Validator.greaterThan("LEVEL_NUMBER_MUST_BE_POSITIVE", props.levelNumber, 0),
      Validator.greaterThanOrEqual("XP_REQUIRED_MUST_BE_POSITIVE", props.xpRequired, 0),
      Validator.isInteger("LEVEL_NUMBER_MUST_BE_INTEGER", props.levelNumber),
      Validator.isInteger("LEVEL_NUMBER_MUST_BE_INTEGER", props.xpRequired)
    ];

    const validErrors = errors.filter((e): e is string => e !== null);

    if (validErrors.length > 0) return Result.fail<Level>(validErrors[0]!);

    return Result.ok(
      new Level(
        {
          levelNumber: props.levelNumber,
          xpRequired: props.xpRequired,
          title: props.title,          
        },
        Id.generate()
      )
    );
  }
 
  static restore(props: RestoreLevelProps): Result<Level> {
    return Result.ok(
      new Level(
        { ...props }, 
        Id.restore(props.id)
      )
    );
  }

  get levelNumber() { return this.props.levelNumber; }
  get xpRequired() { return this.props.xpRequired; }
  get title() { return this.props.title; }
}