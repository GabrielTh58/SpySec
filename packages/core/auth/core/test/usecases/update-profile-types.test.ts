import { ProfileType } from "../../src/user/model/User.entity";
import { UpdateProfileTypeInput } from "../../src/user/usecase/dto/usecases.dto";
import { UpdateProfileType } from "../../src/user/usecase/Update-profile-type";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

const idUserTest = 'user-123'
describe('UpdateProfileType UseCase', () => {
    let useCase: UpdateProfileType;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new UpdateProfileType(mockUserRepository);
    });

    describe('Success', () => {
        it('should switch of personal to corporate', async () => {
            const input: UpdateProfileTypeInput = {
                userId: idUserTest,
                profileType: ProfileType.CORPORATE,
            };

            const existingUser = new UserBuilder()
                .withId(idUserTest)
                .asPersonal()
                .buildWithPassword();

            mockUserRepository.findById.mockResolvedValue(existingUser);
            mockUserRepository.update.mockResolvedValue();

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.profileType).toBe(ProfileType.CORPORATE);
            expect(mockUserRepository.update).toHaveBeenCalled();
        });

        it('should return success without updating if the profile type is already the same. Dont call update ', async () => {
            const input: UpdateProfileTypeInput = {
                userId: idUserTest,
                profileType: ProfileType.PERSONAL,
            };

            const user = new UserBuilder()
                .withId(idUserTest)
                .asPersonal()
                .buildWithPassword();

            mockUserRepository.findById.mockResolvedValue(user);        

            const result = await useCase.execute(input);

            expect(result.succeeded).toBe(true);
            expect(result.value!.profileType).toBe(ProfileType.PERSONAL);
            expect(mockUserRepository.update).not.toHaveBeenCalled();
        });
    });

    describe('Failures', () => {
        it('should fail if user do not exists', async () => {
            const input: UpdateProfileTypeInput = {
                userId: 'inexistent',
                profileType: ProfileType.CORPORATE,
            };

            mockUserRepository.findById.mockResolvedValue(null);

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);
            expect(result.errors[0]!.type).toBe('USER_NOT_FOUND');
        });

        it('should fail to switch profile type if update fails', async () => {
            const input: UpdateProfileTypeInput = {
                userId: idUserTest,
                profileType: ProfileType.CORPORATE,
            };

            const user = new UserBuilder()
                .withId(idUserTest)
                .asPersonal()
                .buildWithPassword();

            mockUserRepository.findById.mockResolvedValue(user);        
            mockUserRepository.update.mockRejectedValue(new Error('Database Error'))

            const result = await useCase.execute(input);

            expect(result.failed).toBe(true);        
            expect(mockUserRepository.update).toHaveBeenCalled();
        });
    });

});