import { Result } from "./Result";

export interface UseCase<Input, Output> {
    execute(input: Input): Promise<Result<Output>>;
}