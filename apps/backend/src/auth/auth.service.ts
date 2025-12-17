import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthFacade, AuthResponse } from '@spysec/auth-adapter';
import { LoginWithGoogleDTO } from './dto/login-google.dto';

@Injectable()
export class AuthService {   

    constructor(
        private readonly authFacade: AuthFacade,               
    ) {}
    

    async registerUser(data: RegisterUserDTO): Promise<AuthResponse> {
        return this.authFacade.register(data);
    }

    async login(data: LoginUserDTO): Promise<AuthResponse> {
        return this.authFacade.login(data);
    }

    async loginWithGoogle(data: LoginWithGoogleDTO){
        return this.authFacade.loginWithGoogle(data)
    }
}
