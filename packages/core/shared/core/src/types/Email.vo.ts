import { Validator } from "@spysec/utils"
import { Result } from "../base/Result"
import { VO } from "../base/VO"

export class Email extends VO<string>{
    static readonly ERROR_REQUIRED = 'EMAIL_REQUIRED'
    static readonly ERROR_INVALID = 'EMAIL_INVALID'
    

    private constructor(value: string){
        super(value)
    }

    static create(value:string): Result<Email> {
        const { notNull, email } = Validator

        const error = 
            notNull(Email.ERROR_REQUIRED, value) ||
            email(Email.ERROR_INVALID, value)

        return error 
            ? Result.fail<Email>({ type: error, value })
            : Result.ok(new Email(value))        
    }

    static restore(value: string): Email{
        return new Email(value)
    }

    getDomain(): string {
        return this.value.split('@')[1] ?? ''
    }
}