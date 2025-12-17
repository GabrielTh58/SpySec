import { User } from "@spysec/auth";
import { UserDTO } from "./User.dto";

export class UserMapper {
    static toDTO(user: User): UserDTO {
        return {
            id: user.id.value,
            name: user.name.value,
            email: user.email.value,
            profileType: user.profileType,
            provider: user.provider,
            isEmailVerified: user.isEmailVerified,
            imageURL: user.imageURL,
            createdAt: user.createdAt,  
            initials: user.name.initials()              
        };
    }
}