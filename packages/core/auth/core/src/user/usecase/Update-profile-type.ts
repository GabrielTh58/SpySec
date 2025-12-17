import { Result, UseCase } from "@spysec/shared";
import { User } from "../model/User.entity";
import { UserRepository } from "../provider/User.repository";
import { UpdateProfileTypeInput } from "./dto/usecases.dto";

export class UpdateProfileType implements UseCase<UpdateProfileTypeInput, User> {
    constructor(private readonly repo: UserRepository) {}

    async execute(input: UpdateProfileTypeInput): Promise<Result<User>> {
        const user = await this.repo.findById(input.userId);
        if (!user) {
            return Result.fail<User>("USER_NOT_FOUND");
        }

        if (user.profileType === input.profileType) {
            return Result.ok(user);
        }
        
        const updatedUser = user.changeProfileType(input.profileType);

        const updateResult = await Result.tryAsync(async () => {
            await this.repo.update(updatedUser);
        });

        if (updateResult.failed) {
            return Result.fail<User>(updateResult.errors);
        }

        return Result.ok(updatedUser);
    }
}