import { ProfileType, ProviderType } from "@spysec/auth";

export interface UserDTO {
    id: string;   
    name: string;   
    email: string;    
    profileType: ProfileType;
    provider: ProviderType;
    isEmailVerified: boolean;
    imageURL: string | null;
    createdAt: Date;
    initials?: string;
}