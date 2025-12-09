import { VO } from "../base/VO";
import { Result } from "../base/Result";
import { Validator } from "@spysec/utils";
import { IdUnique } from "@spysec/utils";
export class Id extends VO<string>{
    static readonly ERRO_INVALID = 'INVALID_ID'
    static readonly ERRO_REQUIRED = 'ID_REQUIRED'
    private constructor(value:string){
        super(value)
    }
    
    static create(value?: string | null): Result<Id> {
        const error = Validator.notNullOrEmpty(Id.ERRO_REQUIRED, value?.trim())

        return error 
            ? Result.fail<Id>({ type: error, value })
            : Result.ok(new Id(value!.trim()))
    }

    static generate(){
        return IdUnique.generate()
    }

    equals(id: Id) {
        return this.value === id.value
    }

    different(id: Id) {
        return this.value !== id.value
    }
}