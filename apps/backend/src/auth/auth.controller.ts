import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoginWithGoogleDTO } from './dto/login-google.dto';
import * as jwt from 'jsonwebtoken';
import { AuthResponse, UserDTO } from '@spysec/auth-adapter';
import { AuthGuard } from './guards/auth-guard.guard';

interface AuthEndpointResponse extends AuthResponse {
    accessToken: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() dto: RegisterUserDTO): Promise<AuthEndpointResponse> {
        const result = await this.authService.registerUser(dto);        
        const token = this._generateTokenJWT(result);
        
        return {
            ...result,
            accessToken: token
        };
    }
    
    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginUserDTO): Promise<AuthEndpointResponse> {
        const result = await this.authService.login(dto);
        const token = this._generateTokenJWT(result);
        
        return {
            ...result,
            accessToken: token
        };
    }   

    @Post('google')
    async loginWithGoogle(@Body() dto: LoginWithGoogleDTO): Promise<AuthEndpointResponse> {
        const result = await this.authService.loginWithGoogle(dto);
        const token = this._generateTokenJWT(result);

        return {
            ...result,
            accessToken: token
        };
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async getProfile(@Req() req: any): Promise<UserDTO>{
        const userId = req.user.sub
        return this.authService.getAuthenticatedUser(userId)
    }

    private _generateTokenJWT(authResult: AuthResponse): string {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
    
        const payload = {
            sub: authResult.user.id,     
            email: authResult.user.email,
            scope: authResult.user.profileType 
        };

        return jwt.sign(payload, secret, { expiresIn: '15d' });
    }
}