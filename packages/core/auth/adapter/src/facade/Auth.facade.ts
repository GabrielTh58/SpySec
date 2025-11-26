import {
    AuthProvider,
    UserRepository,
    LoginUser,
    RegisterUser,
    LoginWithgoogle,
    LoginWithGoogleInput,
    LoginWithGoogleOutput, 
    LoginInput,
    LoginOutput,
    RegisterUserInput,
    RegisterUserOutput
} from '@spysec/auth';

export class AuthFacade {
    constructor(
        private readonly repo: UserRepository,
        private readonly authProvider: AuthProvider
    ) {}

    async login(input: LoginInput): Promise<LoginOutput> {
        const useCase = new LoginUser(this.repo, this.authProvider);
        
        const result = await useCase.execute({
            email: input.email,
            password: input.password
        });

        if (result.failed) result.throwIfFailed();
        return result.value!;
    }

    async register(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const useCase = new RegisterUser(this.repo, this.authProvider);

        const result = await useCase.execute({
            name: input.name,
            email: input.email,
            password: input.password,
            profileType: input.profileType
        });

        if (result.failed) result.throwIfFailed();
        return result.value!;
    }

    async loginWithGoogle(input: LoginWithGoogleInput): Promise<LoginWithGoogleOutput> {
        const useCase = new LoginWithgoogle(this.repo, this.authProvider);

        const result = await useCase.execute({
            idToken: input.idToken
        });

        if (result.failed) result.throwIfFailed();
        return result.value!;
    }
}