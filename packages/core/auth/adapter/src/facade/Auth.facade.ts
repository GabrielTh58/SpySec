import {
    AuthProvider,
    CryptoProvider,
    UserRepository,
    LoginUser,
    RegisterUser,    
    LoginInput,
    LoginWithGoogleInput,
    RegisterUserInput,
    LoginWithGoogle,    
} from '@spysec/auth';

import { UserDTO } from '../dto/User.dto';
import { UserMapper } from '../dto/UserMapper';

export interface AuthResponse {
    user: UserDTO;   
    isNewUser: boolean;
}

export class AuthFacade {
    constructor(
        private readonly repo: UserRepository,
        private readonly cryptoProvider: CryptoProvider,
        private readonly authProvider: AuthProvider
    ) {}

    async login(input: LoginInput): Promise<AuthResponse> {
        const useCase = new LoginUser(this.repo, this.cryptoProvider);
        
        const result = await useCase.execute({
            email: input.email,
            password: input.password
        });

        if (result.failed) result.throwIfFailed();

        const userEntity = result.value!
        const userDTO = UserMapper.toDTO(userEntity.user)

        return {
            user: userDTO, 
            isNewUser: userEntity.isNewUser 
        };
    }

    async register(input: RegisterUserInput): Promise<AuthResponse> {
        const useCase = new RegisterUser(this.repo, this.cryptoProvider);

        const result = await useCase.execute({
            name: input.name,
            email: input.email,
            password: input.password,
            profileType: input.profileType
        });

        if (result.failed) result.throwIfFailed();

        const userEntity = result.value!
        const userDTO = UserMapper.toDTO(userEntity.user)

        return {
            user: userDTO, 
            isNewUser: userEntity.isNewUser 
        }
    }

    async loginWithGoogle(input: LoginWithGoogleInput): Promise<AuthResponse> {
        const useCase = new LoginWithGoogle(this.repo, this.authProvider);

        const result = await useCase.execute({
            idToken: input.idToken,
            profileType: input.profileType
        });

        if (result.failed) result.throwIfFailed();
        
        const userEntity = result.value!
        const userDTO = UserMapper.toDTO(userEntity.user)
        
        return {
            user: userDTO,
            isNewUser: userEntity.isNewUser
        };
    }

    async getAuthenticatedUser(userId: string):Promise<UserDTO>{
        const user = await this.repo.findById(userId)
        if(!user){
            throw new Error("User not found")
        }

        const userDTO = UserMapper.toDTO(user);

        return userDTO
    }
}