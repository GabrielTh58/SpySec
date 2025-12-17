import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoginWithGoogleDTO } from './dto/login-google.dto';
import * as jwt from 'jsonwebtoken';
import { AuthResponse } from '@spysec/auth-adapter';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() dto: RegisterUserDTO): Promise<AuthResponse>{
        return await this.authService.registerUser(dto);     
    }
    
    @Post('login')
    async login(@Body() dto: LoginUserDTO): Promise<string>{
        const user = await this.authService.login(dto)
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign(user, secret, { expiresIn: '15d' });
    }

    @Post('google')
    async loginWithGoogle(@Body() dto: LoginWithGoogleDTO): Promise<AuthResponse>{
        return this.authService.loginWithGoogle(dto)
    }
}
