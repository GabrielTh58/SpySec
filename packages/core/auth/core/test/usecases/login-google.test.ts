import { ProfileType } from "../../src/user/model/User.entity";
import { LoginWithgoogle, LoginWithGoogleInput } from "../../src/user/usecase/Login-google";
import { AuthResultBuilder } from "../builders/auth.builder";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('LoginWithGoogle UseCase', () => {
    let useCase: LoginWithgoogle;
    let mockAuthProvider: ReturnType<typeof MockProvidersBuilder.createAuthProvider>;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAuthProvider = MockProvidersBuilder.createAuthProvider();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new LoginWithgoogle(mockUserRepository, mockAuthProvider);
    });

    describe('Sucesso', () => {        
        it('deve criar novo user no primeiro login', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-google-token',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('maria@gmail.com')
                .withFirebaseUid('google-123')
                .withDisplayName('Maria Santos')
                .asGoogleAuth()
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
            mockUserRepository.create.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.isNewUser).toBe(true);
            expect(result.value!.user.email.value).toBe('maria@gmail.com');
            expect(result.value!.user.provider).toBe('google');
            expect(result.value!.user.isEmailVerified).toBe(true);
            expect(mockUserRepository.create).toHaveBeenCalled();
        });

        it('deve fazer login de user existente', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('pedro@gmail.com')
                .withFirebaseUid('google-456')
                .asGoogleAuth()
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);

            const existingUser = new UserBuilder()
                .withFirebaseUid('google-456')
                .withEmail('pedro@gmail.com')
                .asGoogleUser()
                .build();

            mockUserRepository.findByFirebaseUid.mockResolvedValue(existingUser);
            mockUserRepository.update.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.isNewUser).toBe(false);
            expect(mockUserRepository.create).not.toHaveBeenCalled();
            expect(mockUserRepository.update).toHaveBeenCalled();
        });

        it('deve usar username do email se displayName undefined', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('semnome@gmail.com')
                .withFirebaseUid('google-789')
                .withoutDisplayName()
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
            mockUserRepository.create.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.name.value).toBe('semnome');
        });

        it('deve sincronizar foto do Google', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('test@gmail.com')
                .withFirebaseUid('google-photo')
                .withPhotoURL('https://photo.url')
                .asGoogleAuth()
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
            mockUserRepository.create.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.imageURL).toBe('https://photo.url');
        });

        describe('ProfileType', () => {
            it('deve usar profileType enviado pelo frontend', async () => {
                const input: LoginWithGoogleInput = {
                    idToken: 'valid-token',
                    profileType: ProfileType.CORPORATE, // ← Frontend escolheu
                };

                const authResult = new AuthResultBuilder()
                    .withEmail('empresa@empresa.com')
                    .withFirebaseUid('google-123')
                    .asGoogleAuth()
                    .build();

                mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
                mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
                mockUserRepository.create.mockResolvedValue(undefined);

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.user.profileType).toBe(ProfileType.CORPORATE);
            });

            it('deve inferir corporate de email corporativo', async () => {
                const input: LoginWithGoogleInput = {
                    idToken: 'valid-token',
                };

                const authResult = new AuthResultBuilder()
                    .withEmail('user@empresa.com.br') 
                    .withFirebaseUid('google-456')
                    .asGoogleAuth()
                    .build();

                mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
                mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
                mockUserRepository.create.mockResolvedValue(undefined);

                const result = await useCase.execute(input);

                expect(result.succeeded).toBe(true);
                expect(result.value!.user.profileType).toBe(ProfileType.CORPORATE);
            });

            it('deve inferir personal de Gmail', async () => {
                const input: LoginWithGoogleInput = {
                    idToken: 'valid-token',
                };

                const authResult = new AuthResultBuilder()
                    .withEmail('user@gmail.com') // Gmail
                    .withFirebaseUid('google-789')
                    .asGoogleAuth()
                    .build();

                mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
                mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
                mockUserRepository.create.mockResolvedValue(undefined);

                const result = await useCase.execute(input);

                expect(result.succeeded).toBe(true);
                expect(result.value!.user.profileType).toBe(ProfileType.PERSONAL);
            });
        });
    });

    describe('Falhas', () => {
        it('deve falhar com token inválido', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'invalid-token',
            };

            mockAuthProvider.loginWithGoogle.mockRejectedValue(
                new Error('auth/invalid-id-token')
            );

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]!.type).toBe('INVALID_GOOGLE_TOKEN');
        });

        it('deve falhar se validação de User falha', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withEmail('email-invalido')
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
        });

        it('deve falhar se DB rejeita criação', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('google-fail')
                .asGoogleAuth()
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);
            mockUserRepository.findByFirebaseUid.mockResolvedValue(null);
            mockUserRepository.create.mockRejectedValue(new Error('DB Error'));

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
        });

        it('não deve falhar se update falha em user existente', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-token',
            };

            const authResult = new AuthResultBuilder()
                .withFirebaseUid('google-update-fail')
                .build();

            mockAuthProvider.loginWithGoogle.mockResolvedValue(authResult);

            const existingUser = new UserBuilder()
                .withFirebaseUid('google-update-fail')
                .asGoogleUser()
                .build();

            mockUserRepository.findByFirebaseUid.mockResolvedValue(existingUser);
            mockUserRepository.update.mockRejectedValue(new Error('Update failed'));

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
        });
    });
});