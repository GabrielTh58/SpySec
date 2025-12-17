import { LoginInput, LoginUser } from "../../src";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('LoginUser UseCase (Native)', () => {
    let useCase: LoginUser;
    
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;
    let mockCryptoProvider: ReturnType<typeof MockProvidersBuilder.createCryptoProvider>;

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        mockCryptoProvider = MockProvidersBuilder.createCryptoProvider();
        
        useCase = new LoginUser(mockUserRepository, mockCryptoProvider);
    });

    describe('Success', () => {
        it('should log in with valid credentials', async () => {
            // ARRANGE
            const input: LoginInput = {
                email: 'joao@test.com',
                password: 'SenhaForte123!',
            };
            
            const existingUser = new UserBuilder()
                .withEmail('joao@test.com')
                .buildWithPassword(); 

            mockUserRepository.findByEmail.mockResolvedValue(existingUser);            
            mockCryptoProvider.compare.mockResolvedValue(true);            
            mockUserRepository.update.mockResolvedValue();

            
            const result = await useCase.execute(input);
            
            expect(result.succeeded).toBe(true);
            expect(result.value!.user.email.value).toBe('joao@test.com');
            expect(result.value!.isNewUser).toBe(false);

            
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('joao@test.com');
            expect(mockCryptoProvider.compare).toHaveBeenCalledWith('SenhaForte123!', expect.any(String));
            expect(mockUserRepository.update).toHaveBeenCalled();
            
            
            const userUpdated = mockUserRepository.update.mock.calls[0]?.[0];
            expect(userUpdated?.lastLoginAt).toBeInstanceOf(Date);
        });
    });

    describe('Failures', () => {
        it('should fail if user is not found (Wrong email)', async () => {
            const input: LoginInput = {
                email: 'naoexiste@test.com',
                password: '123',
            };
            
            mockUserRepository.findByEmail.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(false);
            expect(result.errors[0]?.type).toBe("INVALID_CREDENTIALS");
            
            expect(mockCryptoProvider.compare).not.toHaveBeenCalled();
            expect(mockUserRepository.update).not.toHaveBeenCalled();
        });

        it('should fail if the password is incorrect', async () => {
            const input: LoginInput = {
                email: 'joao@test.com',
                password: 'senha-errada',
            };

            const existingUser = new UserBuilder()
                .withEmail('joao@test.com')
                .buildWithPassword();

            mockUserRepository.findByEmail.mockResolvedValue(existingUser);            
            mockCryptoProvider.compare.mockResolvedValue(false);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(false);
            expect(result.errors[0]?.type).toBe("INVALID_CREDENTIALS");
          
            expect(mockCryptoProvider.compare).toHaveBeenCalled();
            expect(mockUserRepository.update).not.toHaveBeenCalled();
        });

        it('should fail if the user does not have a password set (Google login trying password)', async () => {
            const input: LoginInput = {
                email: 'google@test.com',
                password: '123',
            };

            const googleUser = new UserBuilder()
                .withEmail('google@test.com')
                .buildWithGoogle();

            mockUserRepository.findByEmail.mockResolvedValue(googleUser);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(false);
            expect(result.errors[0]?.type).toBe("INVALID_CREDENTIALS"); 
                        
            expect(mockCryptoProvider.compare).not.toHaveBeenCalled();
        });

        it('should return failure if the database errors when updating', async () => {
            const input: LoginInput = {
                email: 'joao@test.com',
                password: '123',
            };

            const existingUser = new UserBuilder().buildWithPassword();
            
            mockUserRepository.findByEmail.mockResolvedValue(existingUser);
            mockCryptoProvider.compare.mockResolvedValue(true);
            
            mockUserRepository.update.mockRejectedValue(new Error("Database Timeout"));

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(false);          
            expect(result.failed).toBe(true);
        });
    });
});