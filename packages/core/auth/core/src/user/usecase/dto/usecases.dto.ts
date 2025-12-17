import { ProfileType, User } from "../../model/User.entity"

export interface LoginWithGoogleInput {
    idToken: string;
    profileType?: ProfileType;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterUserInput {
    email: string;
    password: string;
    name: string;
    profileType: ProfileType;
}

export interface AuthResult{
    user: User
    isNewUser: boolean
}

export interface UpdateProfileTypeInput {
    userId: string;
    profileType: ProfileType
}
