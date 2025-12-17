import { LoginWithGoogle, LoginWithGoogleInput } from "../../src";
import { ProfileType } from "../../src/user/model/User.entity";
import { FirebaseDataBuilder } from "../builders/auth.builder";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('LoginWithGoogle UseCase', () => {
    let useCase: LoginWithGoogle;
    let mockAuthProvider: ReturnType<typeof MockProvidersBuilder.createAuthProvider>;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAuthProvider = MockProvidersBuilder.createAuthProvider();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new LoginWithGoogle(mockUserRepository, mockAuthProvider);
    });

    describe('Success', () => {        
        it('should create new user of the personal type on the first login', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-google-token',
            };

            const authResult = new FirebaseDataBuilder()
                .withEmail('teste@gmail.com')
                .withPhotoURL('photo-url-google')
                .build()
               
            mockAuthProvider.verifyGoogleToken.mockResolvedValue(authResult);      
            mockUserRepository.findByEmail.mockResolvedValue(null)
            mockUserRepository.create.mockResolvedValue()      

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.isNewUser).toBe(true);            
            expect(result.value!.user.provider).toBe("GOOGLE");
            expect(result.value!.user.isEmailVerified).toBe(true);
            expect(mockUserRepository.create).toHaveBeenCalled();

            const userCreated = mockUserRepository.create.mock.calls[0]?.[0]
            expect(userCreated?.profileType).toBe(ProfileType.PERSONAL);
            expect(userCreated?.imageURL).toBe('photo-url-google');
            
        });

        
        it('should create new user of corporate type on the first login', async () => {
            const input: LoginWithGoogleInput = {
                idToken: 'valid-google-token',
            };

            const authResult = new FirebaseDataBuilder()
                .withEmail('teste@corporative.com')
                .withPhotoURL('photo-url')
                .build()
               
            mockAuthProvider.verifyGoogleToken.mockResolvedValue(authResult); 
            mockUserRepository.findByEmail.mockResolvedValue(null);     
            mockUserRepository.create.mockResolvedValue()      

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.isNewUser).toBe(true);            
            expect(result.value!.user.provider).toBe("GOOGLE");
            expect(result.value!.user.isEmailVerified).toBe(true);
            expect(mockUserRepository.create).toHaveBeenCalled();

            const userCreated = mockUserRepository.create.mock.calls[0]?.[0]
            expect(userCreated?.profileType).toBe(ProfileType.CORPORATE);
            expect(userCreated?.imageURL).not.toBe(null);
            
        });

        it('should make login if user exists and update the datas', async () => {  
            const input: LoginWithGoogleInput = {
                idToken: 'valid-google-token',
            };
            const commonEmail = 'test@gmail.com'
            const firebaseUser = new FirebaseDataBuilder()
                .withEmail(commonEmail)                                
                .build();

            const existingUser = new UserBuilder()
                .withEmail(commonEmail)
                .buildWithPassword()                
                
            
            mockAuthProvider.verifyGoogleToken.mockResolvedValue(firebaseUser);            
            mockUserRepository.findByEmail.mockResolvedValue(existingUser);
            mockUserRepository.update.mockResolvedValue();

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.isNewUser).toBe(false);
            expect(result.value!.user.email.value).toBe(commonEmail)
            expect(mockUserRepository.create).not.toHaveBeenCalled();
            expect(mockUserRepository.update).toHaveBeenCalled();

            const userUpdated = mockUserRepository.update.mock.calls[0]?.[0];
            expect(userUpdated).toBeDefined();
        });
    })
    describe('Failures', () => {
        it('should fail if google token as invalid', async () => {
            const input: LoginWithGoogleInput = { idToken: 'invalid-token' };

            
            mockAuthProvider.verifyGoogleToken.mockRejectedValue(new Error('Invalid Signature'));

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]?.type).toBe("INVALID_GOOGLE_TOKEN");
            
            expect(mockUserRepository.create).not.toHaveBeenCalled();
            expect(mockUserRepository.update).not.toHaveBeenCalled();
        });

        it('should fail if there is an error when saving to the database', async () => {
            const input: LoginWithGoogleInput = { idToken: 'valid' };
            
            const authData = new FirebaseDataBuilder().withEmail('new@test.com').build();
            
            mockAuthProvider.verifyGoogleToken.mockResolvedValue(authData);
            mockUserRepository.findByEmail.mockResolvedValue(null);
            
            
            mockUserRepository.create.mockRejectedValue(new Error('DB Connection Fail'));

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(mockUserRepository.create).toHaveBeenCalled();
        });
    });
        
});