import { Result, UseCase } from "@spysec/shared";
import { AuthProvider } from "../provider/Auth.provider";
import { User } from "../model/User.entity";
import { UserRepository } from "../provider/User.repository";

export type LoginInput = {
    email: string;
    password: string;
}

export type LoginOutput = {
    user: User
    accessToken: string;
    error?: string
}

export class LoginUser implements UseCase<LoginInput, LoginOutput> {
    constructor(
        private readonly repo: UserRepository,
        private readonly authProvider: AuthProvider
    ){}

    async execute(input: LoginInput): Promise<Result<LoginOutput>> {
        const authResult = await Result.tryAsync(async () => {
            return await this.authProvider.loginWithEmail({
                email: input.email,
                password: input.password,
            })
        });

        if(authResult.failed){
            return Result.fail<LoginOutput>("INVALID_CREDENTIALS");
        }
            
        const { accessToken, firebaseUser } = authResult.value!;

        const user = await this.repo.findByFirebaseUid(firebaseUser.uid);

        if(!user){
            return Result.fail<LoginOutput>("USER_NOT_FOUND");
        }
        
        const updatedUser = user.recordLogin();
        const updateResult = await Result.tryAsync(async () => {
            await this.repo.update(updatedUser);
        })

        if (updateResult.failed) {
            console.error("Failed to update lastLoginAt:", updateResult.errors);
        }

      
        return Result.ok({ user: updatedUser, accessToken });     
    }
}