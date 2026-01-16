import { Result } from "../base";
import { VO } from "../base/VO";

export class Slug extends VO<string>{
  static readonly ERROR_TOO_SHORT = 'SLUG_TOO_SHORT'

  private constructor(public readonly value: string) {
    super(value)
  }

  public static create(title: string): Result<Slug> {

    if (!title || title.length < 3) {
      return Result.fail(this.ERROR_TOO_SHORT);
    }
    
    const slug = title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^\w\s-]/g, "") 
      .replace(/\s+/g, "-");

    return Result.ok(new Slug(slug));
  }
  
 static restore(slug: string): Slug {
    return new Slug(slug);
  }
}