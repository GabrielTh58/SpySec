import { User, UserProps } from './model/User.entity';
import { UserRepository } from './provider/User.repository';
import { AuthProvider } from './provider/Auth.provider';

import { LoginUser, LoginInput, LoginOutput } from './usecase/Login';
import { LoginWithgoogle, LoginWithGoogleInput, LoginWithGoogleOutput } from './usecase/Login-google';
import { RegisterUser, RegisterUserInput, RegisterUserOutput } from './usecase/Register-user';
import { UpdateProfileType } from './usecase/Update-profile-type';

import { ProfileType } from './model/User.entity';

export { User, LoginUser, LoginWithgoogle, RegisterUser, UpdateProfileType, ProfileType }

export type {
    UserProps,
    UserRepository,
    AuthProvider,
    RegisterUserInput,
    RegisterUserOutput,
    LoginInput,
    LoginOutput,
    LoginWithGoogleInput,
    LoginWithGoogleOutput
}