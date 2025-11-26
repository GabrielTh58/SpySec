import { Validator } from "@spysec/utils";
import { VO } from "../base/VO";
import { Result } from "../base/Result";

export class StrongPassword extends VO<string>{
    static readonly ERROR_WEAK = 'PASSWORD_WEAK'

    private constructor(value: string){
        super(value)
    }

    static create(value: string): Result<StrongPassword> {
        const { password } = Validator

        const error = password(StrongPassword.ERROR_WEAK, value)

        return error 
            ? Result.fail<StrongPassword>({ type: error, value }) 
            : Result.ok(new StrongPassword(value))        
    }
}