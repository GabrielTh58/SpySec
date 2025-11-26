import { LoginInput, LoginUser } from "../../src/user/usecase/Login";
import { AuthResultBuilder } from "../builders/auth.builder";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('LoginUser UseCase', () => {
    let useCase: LoginUser;
    let mockAuthProvider: ReturnType<typeof MockProvidersBuilder.createAuthProvider>;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAuthProvider = MockProvidersBuilder.createAuthProvider();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new LoginUser(mockUserRepository, mockAuthProvider);
    });

    describe('Sucesso', () => {
        it('deve fazer login com credenciais válidas', async () => {
            const input: LoginInput = {
                email: 'joao@test.com',
                password: 'Senha123!',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('joao@test.com')
                .withFirebaseUid('fb-123')
                .build();

            mockAuthProvider.loginWithEmail.mockResolvedValue(authResult);

            const existingUser = new UserBuilder()
                .withFirebaseUid('fb-123')
                .withEmail('joao@test.com')
                .build();

            mockUserRepository.findByFirebaseUid.mockResolvedValue(existingUser);
            mockUserRepository.update.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.email.value).toBe('joao@test.com');
            expect(result.value!.accessToken).toBe('mock-access-token');
            expect(mockUserRepository.findByFirebaseUid).toHaveBeenCalledWith('fb-123');
            expect(mockUserRepository.update).toHaveBeenCalled();
        });

        it('deve atualizar lastLoginAt', async () => {
            const input: LoginInput = {
                email: 'test@test.com',
                password: 'Senha123!',
            };

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('fb-456')
                .build();

            mockAuthProvider.loginWithEmail.mockResolvedValue(authResult);

            const user = new UserBuilder()
                .withFirebaseUid('fb-456')
                .build();

            mockUserRepository.findByFirebaseUid.mockResolvedValue(user);
            mockUserRepository.update.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

             expect(result.succeeded).toBe(true);
                        
            expect(mockUserRepository.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    lastLoginAt: expect.any(Date)
                })
);
        });
    });

    describe('Falhas', () => {
        it('deve falhar com credenciais inválidas', async () => {
            const input: LoginInput = {
                email: 'joao@test.com',
                password: 'senha-errada',
            };

            mockAuthProvider.loginWithEmail.mockRejectedValue(
                new Error('auth/wrong-password')
            );

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]!.type).toBe('INVALID_CREDENTIALS');
            expect(mockUserRepository.findByFirebaseUid).not.toHaveBeenCalled();
        });

        it('deve falhar se user não existe no DB', async () => {
            const input: LoginInput = {
                email: 'orfao@test.com',
                password: 'Senha123!',
            };

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('fb-orphan')
                .build();

            mockAuthProvider.loginWithEmail.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]!.type).toBe('USER_NOT_FOUND');
        });

        it('não deve falhar se update falha', async () => {
            const input: LoginInput = {
                email: 'test@test.com',
                password: 'Senha123!',
            };

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('fb-789')
                .build();

            mockAuthProvider.loginWithEmail.mockResolvedValue(authResult);

            const user = new UserBuilder()
                .withFirebaseUid('fb-789')
                .build();

            mockUserRepository.findByFirebaseUid.mockResolvedValue(user);
            mockUserRepository.update.mockRejectedValue(new Error('Update failed'));

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
        });
    });
});