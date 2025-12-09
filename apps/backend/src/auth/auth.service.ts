import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { PrismaUserRepository } from './adapter/prisma-user.repository';
import { AuthFacade } from '@spysec/auth-adapter';
import { FirebaseAuthAdapter } from './adapter/firebase-auth.adapter';


@Injectable()
export class AuthService {
    private readonly authFacade: AuthFacade;

    constructor(
        private readonly authProvider: FirebaseAuthAdapter,
        private readonly userRepository: PrismaUserRepository
    ) {
        this.authFacade = new AuthFacade(this.userRepository, this.authProvider);
    }

    async registerUser(data: RegisterUserDTO) {
        return this.authFacade.register(data);
    }

    async login(data: LoginUserDTO) {
        return this.authFacade.login(data);
    }
}
