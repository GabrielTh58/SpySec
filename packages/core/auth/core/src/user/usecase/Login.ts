import { Result, UseCase } from "@spysec/shared";
import { UserRepository } from "../provider/User.repository";
import { CryptoProvider } from "../provider/Crypto.provider";
import { AuthResult, LoginInput } from "./dto/usecases.dto";


export class LoginUser implements UseCase<LoginInput, AuthResult> {
    constructor(
        private readonly repo: UserRepository,
        private readonly crypto: CryptoProvider
    ){}

    async execute(input: LoginInput): Promise<Result<AuthResult>> {
        const { email, password } = input        

        const user = await this.repo.findByEmail(email);                        
        if(!user || !user.password) { 
            return Result.fail("INVALID_CREDENTIALS");
        } 

        const passwordMatch = await this.crypto.compare(
            password,             
            user.password.value
        );
        if(!passwordMatch){
            return Result.fail("INVALID_CREDENTIALS");
        }

        const updatedUser = user.recordLogin();
        const updateResult = await Result.tryAsync(async () => {
            await this.repo.update(updatedUser);
        })        
        if (updateResult.failed) {            
            return Result.fail(updateResult.errors);
        }
      
        return Result.ok({
            user: updatedUser,
            isNewUser: false
        });     
    }
}