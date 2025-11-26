import { Result, UseCase } from "@spysec/shared";
import { ProfileType, User } from "../model/User.entity";
import { UserRepository } from "../provider/User.repository";

export interface UpdateProfileTypeInput {
    userId: string;
    profileType: ProfileType
}

export interface UpdateProfileTypeOutput {
    user: User;
}

export class UpdateProfileType implements UseCase<UpdateProfileTypeInput, UpdateProfileTypeOutput> {
    constructor(private readonly repo: UserRepository) {}

    async execute(input: UpdateProfileTypeInput): Promise<Result<UpdateProfileTypeOutput>> {
        const user = await this.repo.findById(input.userId);

        if (!user) {
            return Result.fail<UpdateProfileTypeOutput>("USER_NOT_FOUND");
        }

        const updatedUser = user.changeProfileType(input.profileType);

        const updateResult = await Result.tryAsync(async () => {
            await this.repo.update(updatedUser);
        });

        if (updateResult.failed) {
            return Result.fail<UpdateProfileTypeOutput>(updateResult.errors);
        }

        return Result.ok({
            user: updatedUser,
        });
    }
}