import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() dto: RegisterUserDTO){
        return this.authService.registerUser(dto)
    }
    
    @Post('login')
    async login(@Body() dto: LoginUserDTO){
        return this.authService.login(dto)
    }
}
