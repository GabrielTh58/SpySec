import { CryptoProvider } from "../../src";
import { AuthProvider } from "../../src/user/provider/Auth.provider";
import { UserRepository } from "../../src/user/provider/User.repository";

export class MockProvidersBuilder {
    static createAuthProvider(): jest.Mocked<AuthProvider> {
        return {
            verifyGoogleToken: jest.fn(),            
            deleteAccount: jest.fn(),
        }as unknown as jest.Mocked<AuthProvider>
    }

    static createCryptoProvider(): jest.Mocked<CryptoProvider> {
        return {
            encrypt: jest.fn(),
            compare: jest.fn(),
        } as unknown as jest.Mocked<CryptoProvider>;
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
        } as unknown as jest.Mocked<UserRepository>
    }
}