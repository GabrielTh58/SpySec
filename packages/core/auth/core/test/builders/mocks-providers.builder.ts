import { AuthProvider } from "../../src/user/provider/Auth.provider";
import { UserRepository } from "../../src/user/provider/User.repository";

export class MockProvidersBuilder {
    static createAuthProvider(): jest.Mocked<AuthProvider> {
        return {
            registerWithEmail: jest.fn(),
            loginWithEmail: jest.fn(),
            loginWithGoogle: jest.fn(),
            verifyToken: jest.fn(),
            sendEmailVerification: jest.fn(),
            sendPasswordReset: jest.fn(),
            deleteAccount: jest.fn(),
        };
    }

    static createUserRepository(): jest.Mocked<UserRepository> {
        return {
            create: jest.fn(),
            update: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByFirebaseUid: jest.fn(),
            existsByEmail: jest.fn(),
            delete: jest.fn(),
        };
    }
}