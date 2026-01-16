import { ProfileType, User } from "../../model/User.entity"

export interface AuthResultDTO{
    user: User
    isNewUser: boolean
}

