import { Error } from  '@spysec/utils'

export class Result<T>{
    constructor(
        readonly value: T | undefined,
        readonly errors: Error[] = []
    ){}

    static ok<T>(value: T): Result<T> {
        return new Result(value);
    }

    static fail<T>(err: string | Error | Error[]): Result<T> {
        const erro = typeof err === 'string' ? [{ type: err }] : err
        return new Result<T>(undefined, Array.isArray(erro) ? erro : [erro])
    }

    static try<T>(fn: () => T): Result<T> {
        try {
            return Result.ok(fn());
        } catch (error: Error | any) {
            return Result.fail([error]);
        }
    }

    static async tryAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
        try {
            const result = await fn();
            return Result.ok(result);
        } catch (error: Error | any) {
            return Result.fail([error]);
        }
    }

    static combine(results: Result<any>[]): Result<undefined> { 
        const errors = results.flatMap((result) => result.errors);
        return errors.length > 0 ? Result.fail(errors) : Result.ok(undefined);
    }

    get succeeded(): boolean {
        return this.errors.length === 0;
    }
    
    get failed(): boolean {
        return !this.succeeded;
    }

    get asFail(): Result<any> {
        return Result.fail<any>(this.errors!)
    }

    throwIfFailed(): never | void {
        if (this.failed) {
            throw this.errors
        }
    }
}