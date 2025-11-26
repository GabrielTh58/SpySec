import { User } from "../model/User.entity";

export interface UserRepository {
    create(user: User ): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(user: User): Promise<void>;
    findByFirebaseUid(firebaseUid: string): Promise<User | null>
    existsByEmail(email: string): Promise<boolean>;
    delete(id: string): Promise<void>;
}   