import { ProfileType, RegisterUser, RegisterUserInput } from "../../src";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";


describe('RegisterUser UseCase (Native)', () => {
    let useCase: RegisterUser;
    
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;
    let mockCryptoProvider: ReturnType<typeof MockProvidersBuilder.createCryptoProvider>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        mockCryptoProvider = MockProvidersBuilder.createCryptoProvider();
        useCase = new RegisterUser(mockUserRepository, mockCryptoProvider);
    });

    describe('Success', () => {
        it('should register user as Personal type with valid credentials', async () => {        
            const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: 'SenhaForte123!',
                name: 'Joao Silva',
                profileType: ProfileType.PERSONAL
            };            
            const validHashMock = '$2b$10$FakeHashBcryptValid123'

            mockUserRepository.findByEmail.mockResolvedValue(null);                                    
            mockCryptoProvider.encrypt.mockResolvedValue(validHashMock);           
            mockUserRepository.create.mockResolvedValue();
            
            const result = await useCase.execute(input);
            
            expect(result.succeeded).toBe(true); 
            expect(result.value!.user.email.value).toBe(input.email);
            expect(result.value!.isNewUser).toBe(true);
            
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);            
            expect(mockCryptoProvider.encrypt).toHaveBeenCalledWith(input.password); 
            expect(mockUserRepository.create).toHaveBeenCalled();
                        
            const userCreated = mockUserRepository.create.mock.calls[0]?.[0];
            expect(userCreated?.profileType).toBe(ProfileType.PERSONAL);
            expect(userCreated?.password?.value).toBe(validHashMock);            
        });

        it('should register user as Corporate type', async () => {        
            const input: RegisterUserInput = {
                email: 'empresa@corp.com',
                password: 'SenhaForte123!',
                name: 'Empresa Ltd',
                profileType: ProfileType.CORPORATE
            };
            const validHashMock = '$2b$10$FakeHashBcryptValid123'

            mockUserRepository.findByEmail.mockResolvedValue(null);            
            mockCryptoProvider.encrypt.mockResolvedValue(validHashMock);
            mockUserRepository.create.mockResolvedValue();
            
            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.email.value).toBe(input.email);
            expect(result.value!.isNewUser).toBe(true);
            
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);            
            expect(mockCryptoProvider.encrypt).toHaveBeenCalledWith(input.password); 
            
            const userCreated = mockUserRepository.create.mock.calls[0]?.[0];
            expect(userCreated?.profileType).toBe(ProfileType.CORPORATE);
            expect(userCreated?.password?.value).toBe(validHashMock)
        });
    });

    describe('Failures', () => {
        it('should fail if email already exists', async () => {
            const input: RegisterUserInput = {
                email: 'existe@test.com',
                password: 'SenhaForte123!',
                name: 'Joao',
                profileType: ProfileType.PERSONAL
            };

            const existingUser = new UserBuilder()
                .withEmail(input.email)
                .buildWithPassword();

            mockUserRepository.findByEmail.mockResolvedValue(existingUser);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]?.type).toBe("EMAIL_ALREADY_EXISTS");            
           
            expect(mockUserRepository.create).not.toHaveBeenCalled();
            expect(mockCryptoProvider.encrypt).not.toHaveBeenCalled();
        });

        it('should fail if password is weak (Domain Validation)', async () => {
            const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: '123',
                name: 'Joao',
                profileType: ProfileType.PERSONAL
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);            
            expect(result.errors).toBeDefined(); 
            
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });

        it('should fail if email is invalid (Domain Validation)', async () => {
            const input: RegisterUserInput = {
                email: 'email-invalido', 
                password: 'SenhaForte123!',
                name: 'Joao',
                profileType: ProfileType.PERSONAL
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });

        it('should fail if repository throws error', async () => {
             const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: 'SenhaForte123!',
                name: 'Joao',
                profileType: ProfileType.PERSONAL
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockCryptoProvider.encrypt.mockResolvedValue('hash');
            
            // Simula erro de banco de dados
            mockUserRepository.create.mockRejectedValue(new Error('DB Error'));

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
        });

        it('should fail if crypto provider throws error', async () => {
            const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: 'SenhaForte123!',
                name: 'Joao',
                profileType: ProfileType.PERSONAL
            };
        
            mockUserRepository.findByEmail.mockResolvedValue(null);                        
            mockCryptoProvider.encrypt.mockRejectedValue(new Error('Hashing Error'));      
          
       
            await expect(useCase.execute(input)).rejects.toThrow('Hashing Error');
        
       
        });
    });
});