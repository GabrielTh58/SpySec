import { UserProps } from "@spysec/auth";
export interface UserDTO extends Omit<UserProps, "updatedAt, firebaseUid, lastLoginAt"> {
    initials?: string
}