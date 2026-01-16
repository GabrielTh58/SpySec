import { CryptoProvider } from "../provider/Crypto.provider";
import { UserRepository } from "../provider/User.repository";
import { DomainEvents, Result, UseCase } from "@spysec/shared";
import { AuthResult, RegisterUserInput } from "./dto/usecases.dto";
import { User } from "../model/User.entity";
import { UserCreatedEvent } from "../events/UserCreatedEvent";

export class RegisterUser implements UseCase<RegisterUserInput, AuthResult>{
    constructor(
        private readonly repo: UserRepository,
        private readonly crypto: CryptoProvider
    ){}

    async execute(input: RegisterUserInput): Promise<Result<AuthResult>> {
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