import { Result, UseCase } from "@spysec/shared"
import { ProfileType, ProviderType, User } from "../model/User.entity"
import { AuthProvider } from "../provider/Auth.provider"
import { UserRepository } from "../provider/User.repository"

export interface LoginWithGoogleInput{
    idToken: string  
    profileType?: ProfileType
}
export interface LoginWithGoogleOutput{
    user: User
    accessToken: string
    isNewUser: boolean
}

export class LoginWithgoogle implements UseCase<LoginWithGoogleInput, LoginWithGoogleOutput>{
    constructor(
        private readonly repo: UserRepository,
        private readonly authProvider: AuthProvider
    ){}

    async execute(input: LoginWithGoogleInput): Promise<Result<LoginWithGoogleOutput>> {
        const authResult = await Result.tryAsync(async () => {
            return await this.authProvider.loginWithGoogle({idToken: input.idToken});
        })

        if(authResult.failed){
            return Result.fail<LoginWithGoogleOutput>("INVALID_GOOGLE_TOKEN");
        }

        const { accessToken, firebaseUser } = authResult.value!;

        let user = await this.repo.findByFirebaseUid(firebaseUser.uid);
        let isNewUser = false;

        if(!user){
            const createUserResult = User.create({
                firebaseUid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName ?? firebaseUser.email.split('@')[0] ?? '',
                provider: ProviderType.GOOGLE,
                profileType: input.profileType || this.inferProfileType(firebaseUser.email),
                isEmailVerified: true,
                imageURL: firebaseUser.photoURL ?? null,
            })

            if(createUserResult.failed){
                return Result.fail<LoginWithGoogleOutput>(createUserResult.errors);
            }

            user = createUserResult.value!;

            const saveResult = await Result.tryAsync(async () => {
                await this.repo.create(user!);
            })

            if(saveResult.failed){
                return Result.fail<LoginWithGoogleOutput>(saveResult.errors);
            }   

            isNewUser = true;
        }
        else{
            const updatedUser = user.recordLogin();

            const updateResult = await Result.tryAsync(async () => {
                await this.repo.update(updatedUser);
            })

            if(updateResult.failed){
                console.error("Failed to update lastLoginAt:", updateResult.errors);
            }

            user = updatedUser;            
        }    

        return Result.ok({
            user,
            accessToken,
            isNewUser
        })
    }

    private inferProfileType(email: string): ProfileType{
        const personalDomains = [
            'gmail.com',
            'yahoo.com',
            'hotmail.com',
            'outlook.com',
            'live.com',
            'icloud.com',
            'protonmail.com',
        ];

        const domain = email.split('@')[1]?.toLowerCase();
        return (
            domain && personalDomains.includes(domain) 
                ? ProfileType.PERSONAL
                : ProfileType.CORPORATE
            )
    }
}