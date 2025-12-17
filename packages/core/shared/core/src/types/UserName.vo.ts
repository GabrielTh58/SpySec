import { Result } from '../base/Result'
import { VO }  from '../base/VO'
import { Validator } from '@spysec/utils'

export interface UserNameSettings {
    min?: number
    max?: number
}

export class UserName extends VO<string> {
    static readonly ERROR_REQUIRED = 'USER_NAME_REQUIRED'
    static readonly ERROR_TOO_SHORT = 'USER_NAME_TOO_SHORT'
    static readonly ERROR_TOO_LONG = 'USER_NAME_TOO_LONG'

    private constructor(
        readonly value: string,
        readonly settings?: UserNameSettings
    ) {
        super(value)
    }

    static create(value?: string | null, settings?: UserNameSettings): Result<UserName> {
        const { min = 3, max = 50 } = settings ?? {}
        const {notNullOrEmpty, lessThanOrEqual, greaterThanOrEqual} = Validator

        const erro =
            notNullOrEmpty(UserName.ERROR_REQUIRED, value) ||
            greaterThanOrEqual(UserName.ERROR_TOO_SHORT, value!.length, min) ||
            lessThanOrEqual(UserName.ERROR_TOO_LONG, value!.length, max) 

        return erro
            ? Result.fail<UserName>({ type: erro, value, details: { min, max } })
            : Result.ok(new UserName(value!))
    }

    static restore(value: string): UserName {
        return new UserName(value);
    }

    initials(): string { 
        const initialsLetters = this.value?.split(" ").map((name) => name[0]).join('') ?? '';
        return initialsLetters; 
    }
}
