import { ProfileType } from "../../src/user/model/User.entity";
import { RegisterUser, RegisterUserInput } from "../../src/user/usecase/Register-user";
import { AuthResultBuilder } from "../builders/auth.builder";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('RegisterUser UseCase', () => {
    let useCase: RegisterUser;
    let mockAuthProvider: ReturnType<typeof MockProvidersBuilder.createAuthProvider>;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAuthProvider = MockProvidersBuilder.createAuthProvider();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new RegisterUser(mockUserRepository, mockAuthProvider);
    });

    describe('Sucesso', () => {
        it('deve registrar usuário pessoal', async () => {
            const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: 'Senha123!',
                name: 'João Silva',
                profileType: ProfileType.PERSONAL,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const authResult = new AuthResultBuilder()
                .withEmail('joao@test.com')
                .withFirebaseUid('fb-123')
                .withDisplayName('João Silva')
                .unverified()
                .build();

            mockAuthProvider.registerWithEmail.mockResolvedValue(authResult);
            mockUserRepository.create.mockResolvedValue(undefined);
            mockAuthProvider.sendEmailVerification.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.email.value).toBe('joao@test.com');
            expect(result.value!.user.profileType).toBe(ProfileType.PERSONAL);
            expect(result.value!.accessToken).toBe('mock-access-token');
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('joao@test.com');
            expect(mockAuthProvider.registerWithEmail).toHaveBeenCalledWith({
                email: 'joao@test.com',
                password: 'Senha123!',
                name: 'João Silva',
            });
            expect(mockUserRepository.create).toHaveBeenCalled();
            expect(mockAuthProvider.sendEmailVerification).toHaveBeenCalledWith('fb-123');
        });

        it('deve registrar usuário corporativo', async () => {
            const input: RegisterUserInput = {
                email: 'ana@empresa.com',
                password: 'Senha123!',
                name: 'Ana Santos',
                profileType: ProfileType.CORPORATE,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const authResult = new AuthResultBuilder()
                .withEmail('ana@empresa.com')
                .withFirebaseUid('fb-456')
                .build();

            mockAuthProvider.registerWithEmail.mockResolvedValue(authResult);
            mockUserRepository.create.mockResolvedValue(undefined);
            mockAuthProvider.sendEmailVerification.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.profileType).toBe(ProfileType.CORPORATE);
        });

        it('deve registrar usuário pessoal com imagem', async () => {
            const input: RegisterUserInput = {
                email: 'joao@test.com',
                password: 'Senha123!',
                name: 'João Silva',
                profileType: ProfileType.PERSONAL,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const authResult = new AuthResultBuilder()
                .withEmail('joao@test.com')
                .withFirebaseUid('fb-123')
                .withDisplayName('João Silva')
                .unverified()
                .build();

            mockAuthProvider.registerWithEmail.mockResolvedValue(authResult);
            mockUserRepository.create.mockResolvedValue(undefined);
            mockAuthProvider.sendEmailVerification.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.email.value).toBe('joao@test.com');
            expect(result.value!.user.profileType).toBe(ProfileType.PERSONAL);
            expect(result.value!.accessToken).toBe('mock-access-token');
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('joao@test.com');
            expect(mockAuthProvider.registerWithEmail).toHaveBeenCalledWith({
                email: 'joao@test.com',
                password: 'Senha123!',
                name: 'João Silva',
            });
            expect(mockUserRepository.create).toHaveBeenCalled();
            expect(mockAuthProvider.sendEmailVerification).toHaveBeenCalledWith('fb-123');
        })
    });

    describe('Falhas', () => {
        it('deve falhar se email já existe', async () => {
            const input: RegisterUserInput = {
                email: 'existente@test.com',
                password: 'Senha123!',
                name: 'Existente',
                profileType: ProfileType.PERSONAL,
            };

            const existingUser = new UserBuilder()
                .withEmail('existente@test.com')
                .build();

            mockUserRepository.findByEmail.mockResolvedValue(existingUser);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]!.type).toBe('EMAIL_ALREADY_EXISTS');
            expect(mockAuthProvider.registerWithEmail).not.toHaveBeenCalled();
        });

        it('deve falhar se Firebase rejeita', async () => {
            const input: RegisterUserInput = {
                email: 'test@test.com',
                password: '123',
                name: 'Test',
                profileType: ProfileType.PERSONAL,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockAuthProvider.registerWithEmail.mockRejectedValue(
                new Error('auth/weak-password')
            );

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });

        it('deve fazer rollback se falhar ao salvar no DB', async () => {
            const input: RegisterUserInput = {
                email: 'test@test.com',
                password: 'Senha123!',
                name: 'Test',
                profileType: ProfileType.PERSONAL,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('fb-rollback')
                .build();

            mockAuthProvider.registerWithEmail.mockResolvedValue(authResult);
            mockUserRepository.create.mockRejectedValue(new Error('DB Error'));

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(mockAuthProvider.deleteAccount).toHaveBeenCalledWith('fb-rollback');
        });

        it('deve falhar se validação de User falha', async () => {
            const input: RegisterUserInput = {
                email: 'test@test.com',
                password: 'Senha123!',
                name: 'Te',
                profileType: ProfileType.PERSONAL,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const authResult = new AuthResultBuilder()
                .withEmail('email-invalido')
                .build();

            mockAuthProvider.registerWithEmail.mockResolvedValue(authResult);

            const result = await useCase.execute(input);
            
            expect(result.failed).toBe(true);
            expect(mockUserRepository.create).not.toHaveBeenCalled();
            expect(mockAuthProvider.deleteAccount).toHaveBeenCalled();
        });
    });
});