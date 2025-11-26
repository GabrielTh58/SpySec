import { ProfileType, ProviderType, User } from "../model/User.entity";
import { AuthProvider } from "../provider/Auth.provider";
import { UserRepository } from "../provider/User.repository";
import { Result, UseCase } from "@spysec/shared";

export interface RegisterUserInput {
    email: string;
    password: string;
    name: string;
    profileType: ProfileType;
}

export interface RegisterUserOutput{
    user: User
    accessToken: string
}

export class RegisterUser implements UseCase<RegisterUserInput, RegisterUserOutput>{
    constructor(
        private readonly repo: UserRepository,
        private readonly authProvider: AuthProvider
    ){}

    async execute(input: RegisterUserInput): Promise<Result<RegisterUserOutput>> {
        const emailExists = await this.repo.findByEmail(input.email);
        if(emailExists){
            return Result.fail("EMAIL_ALREADY_EXISTS");
        }

        const authResult = await Result.tryAsync(async () => {
            return await this.authProvider.registerWithEmail({
                email: input.email,
                password: input.password,
                name: input.name,
            })
        })

        if(authResult.failed){
            return Result.fail<RegisterUserOutput>(authResult.errors);
        }

        const { accessToken, firebaseUser } = authResult.value!;

        const userResult = User.create({
            firebaseUid: firebaseUser.uid,
            email: input.email,
            name: input.name,
            provider: ProviderType.EMAIL,
            profileType: input.profileType,
            isEmailVerified: firebaseUser.emailVerified,
            imageURL: firebaseUser.photoURL ?? null,
        })

        if(userResult.failed){
            await this.authProvider.deleteAccount(firebaseUser.uid);
            return Result.fail<RegisterUserOutput>(userResult.errors);
        }

        const user = userResult.value!;

        const saveResult = await Result.tryAsync(async () => {
            await this.repo.create(user);
        });

        if(saveResult.failed){
            await this.authProvider.deleteAccount(firebaseUser.uid);
            return saveResult as Result<RegisterUserOutput>;
        }

        this.authProvider
            .sendEmailVerification(firebaseUser.uid)
            .catch(() => {
                console.log("Error sending email verification");
            })

        return Result.ok({
            user,
            accessToken
        });
    }    
}