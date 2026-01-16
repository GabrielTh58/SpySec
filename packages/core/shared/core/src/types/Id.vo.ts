import { VO } from "../base/VO";
import { Result } from "../base/Result";
import { Validator } from "@spysec/utils";
import { IdUnique } from "@spysec/utils";

export class Id extends VO<string>{
    static readonly ERRO_INVALID = 'INVALID_ID'
    static readonly ERRO_REQUIRED = 'ID_REQUIRED'
    private static readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    private constructor(value:string){
        super(value)
    }
    
    // Cria instancia de ID
    static create(value?: string | null): Result<Id> {                 
        const trimmedValue = value?.trim();
         
        const emptyError = Validator.notNullOrEmpty(Id.ERRO_REQUIRED, trimmedValue);
        if (emptyError) {
            return Result.fail<Id>({ type: emptyError, value: value });
        }
 
         
        if (!Id.UUID_REGEX.test(trimmedValue!)) {
            return Result.fail<Id>({ type: Id.ERRO_INVALID, value: value });
        }
 
        return Result.ok(new Id(trimmedValue!));
    }

    static generate(){
        return new Id(IdUnique.generate());
    }

    static restore(value: string) : Id{
        return new Id(value)
    }

    toString(): string {
        return this.value; 
    }
    
    equals(id: Id) {
        return this.value === id.value
    }

    different(id: Id) {
        return this.value !== id.value
    }
}