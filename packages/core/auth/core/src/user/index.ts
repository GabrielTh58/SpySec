import { User, UserProps, ProviderType, ProfileType } from './model/User.entity';

import { UserRepository } from './provider/User.repository';
import { AuthProvider, FirebaseUserData } from './provider/Auth.provider';
import { CryptoProvider } from './provider/Crypto.provider';

import { LoginUser } from './usecase/Login';
import { RegisterUser } from './usecase/Register-user';
import { LoginWithGoogle } from './usecase/Login-google'
import { LoginWithGoogleInput, AuthResult, RegisterUserInput, LoginInput } from './usecase/dto/usecases.dto'

export { 
    User, 
    ProfileType, 
    ProviderType,
    LoginUser, 
    RegisterUser, 
    LoginWithGoogle, 
    UserRepository,
    AuthProvider,
    CryptoProvider
}

export type {    
    UserProps,
    FirebaseUserData,
    AuthResult,
    RegisterUserInput,
    LoginInput,
    LoginWithGoogleInput,    
}