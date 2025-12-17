import { User } from "../model/User.entity";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract update(user: User): Promise<void>;
    abstract findByFirebaseUid(firebaseUid: string): Promise<User | null>;
    abstract existsByEmail(email: string): Promise<boolean>;
    abstract delete(id: string): Promise<void>;
  }