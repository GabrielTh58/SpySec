import { DomainEvents, Result, UseCase } from "@spysec/shared";
import { ProfileType, User } from "../model/User.entity";
import { AuthProvider } from "../provider/Auth.provider";       
import { UserRepository } from "../provider/User.repository";
import { UserCreatedEvent } from "../events/UserCreatedEvent";
import { AuthResultDTO } from "./shared/usecases.dto";

export interface LoginWithGoogleInputDTO {
    idToken: string;
    profileType?: ProfileType;
}

export class LoginWithGoogle implements UseCase<LoginWithGoogleInputDTO, AuthResultDTO> {
    constructor(
        private readonly repo: UserRepository,
        private readonly authProvider: AuthProvider
    ) {}

    async execute(input: LoginWithGoogleInputDTO): Promise<Result<AuthResultDTO>> {
        const { idToken } = input;
        
      
        const authResult = await Result.tryAsync(async () => {
            return await this.authProvider.verifyGoogleToken(idToken);
        });

        if (authResult.failed) {
            return Result.fail("INVALID_GOOGLE_TOKEN");
        }

        const firebaseUser = authResult.value!; 
        
        let user = await this.repo.findByEmail(firebaseUser.email);
        let isNewUser = false;

        if (!user) {            
            const createUserResult = User.createWithGoogle({
                firebaseUid: firebaseUser.uid!,
                email: firebaseUser.email,  
                name: firebaseUser.displayName,                     
                profileType: input.profileType || this.inferProfileType(firebaseUser.email),               
                imageURL: firebaseUser.photoURL ?? null,                
            });

            if (createUserResult.failed) {
                return Result.fail(createUserResult.errors);
            }

            user = createUserResult.value!;        
                      
            const result = await Result.tryAsync(async () => {
                await this.repo.create(user!)
            }); 
            if (result.failed) {            
                return Result.fail(result.errors);
            }

            DomainEvents.dispatch(new UserCreatedEvent(user!));

            isNewUser = true;

        } else {       
                        
            const userUpdated = user
                .linkFirebaseAccount(firebaseUser.uid!) 
                .updatePhoto(user.imageURL ?? firebaseUser.photoURL ?? "")
                .recordLogin()         
           
            const updateResult = await Result.tryAsync(async () => {
                await this.repo.update(userUpdated);
            })        
            if (updateResult.failed) {
                return Result.fail(updateResult.errors);
            }  
            
            user = userUpdated;
        }

        return Result.ok({
            user: user,
            isNewUser: isNewUser
        });
    }

    private inferProfileType(email: string): ProfileType {
        const personalDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'live.com', 'icloud.com', 'protonmail.com',
        ];

        const domain = email.split('@')[1]?.toLowerCase();
        return (domain && personalDomains.includes(domain))
            ? ProfileType.PERSONAL
            : ProfileType.CORPORATE;
    }
}