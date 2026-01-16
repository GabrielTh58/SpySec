import { CryptoProvider } from "../provider/Crypto.provider";
import { UserRepository } from "../provider/User.repository";
import { DomainEvents, Result, UseCase } from "@spysec/shared";
import { AuthResultDTO } from "./shared/usecases.dto";
import { ProfileType, User } from "../model/User.entity";
import { UserCreatedEvent } from "../events/UserCreatedEvent";

export interface RegisterUserInputDTO {
    email: string;
    password: string;
    name: string;
    profileType: ProfileType;
}

export class RegisterUser implements UseCase<RegisterUserInputDTO, AuthResultDTO>{
    constructor(
        private readonly repo: UserRepository,
        private readonly crypto: CryptoProvider
    ){}

    async execute(input: RegisterUserInputDTO): Promise<Result<AuthResultDTO>> {
        const {email, password, name, profileType } = input
        
        const user = await this.repo.findByEmail(input.email);
        if(user){
            return Result.fail("EMAIL_ALREADY_EXISTS");
        }         

        const userResult = User.createWithPassword({            
            email,
            name,
            password,            
            profileType: profileType,                       
        })

        if(userResult.failed){            
            return Result.fail(userResult.errors);
        }

        const userEntity = userResult.value!;
        const hashedPassword = await this.crypto.encrypt(password)

        const userWithHashResult = userEntity.setEncryptedPassword(hashedPassword)    
        if (userWithHashResult.failed) {
            return Result.fail(userWithHashResult.errors);
        }

        const newUser = userWithHashResult.value!

        const createUserDb = await Result.tryAsync(async () => {
            await this.repo.create(newUser);
        })        
        if (createUserDb.failed) {
            return Result.fail(createUserDb.errors);
        }     
        
        DomainEvents.dispatch(new UserCreatedEvent(newUser))

        return Result.ok({
            user:newUser,
            isNewUser: true
        });
    }    
}