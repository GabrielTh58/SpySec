import { ProfileType } from "../../src/user/model/User.entity";
import { UpdateProfileType, UpdateProfileTypeInput } from "../../src/user/usecase/Update-profile-type";
import { MockProvidersBuilder } from "../builders/mocks-providers.builder";
import { UserBuilder } from "../builders/usuario.builder";

describe('UpdateProfileType UseCase', () => {
    let useCase: UpdateProfileType;
    let mockUserRepository: ReturnType<typeof MockProvidersBuilder.createUserRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = MockProvidersBuilder.createUserRepository();
        useCase = new UpdateProfileType(mockUserRepository);
    });

    it('deve mudar de personal para corporate', async () => {
        const input: UpdateProfileTypeInput = {
            userId: 'user-123',
            profileType: ProfileType.CORPORATE,
        };

        const existingUser = new UserBuilder()
            .withId('user-123')
            .asPersonal()
            .build();

        mockUserRepository.findById.mockResolvedValue(existingUser);
        mockUserRepository.update.mockResolvedValue(undefined);

        const result = await useCase.execute(input);

        expect(result.succeeded).toBe(true);
        expect(result.value!.user.profileType).toBe(ProfileType.CORPORATE);
        expect(mockUserRepository.update).toHaveBeenCalled();
    });

    it('deve ser idempotente (mesmo tipo)', async () => {
        const input: UpdateProfileTypeInput = {
            userId: 'user-456',
            profileType: ProfileType.PERSONAL,
        };

        const user = new UserBuilder()
            .withId('user-456')
            .asPersonal()
            .build();

        mockUserRepository.findById.mockResolvedValue(user);
        mockUserRepository.update.mockResolvedValue(undefined);

        const result = await useCase.execute(input);

        expect(result.succeeded).toBe(true);
        expect(mockUserRepository.update).toHaveBeenCalled();
    });

    it('deve falhar se user não existe', async () => {
        const input: UpdateProfileTypeInput = {
            userId: 'inexistente',
            profileType: ProfileType.CORPORATE,
        };

        mockUserRepository.findById.mockResolvedValue(null);

        const result = await useCase.execute(input);

        expect(result.failed).toBe(true);
        expect(result.errors[0]!.type).toBe('USER_NOT_FOUND');
    });
});