import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, RegisterUserInput } from '@spysec/auth';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() createAuthDto: RegisterUserInput) {
    
  }

  @Post()
  login(@Body() createAuthDto: LoginInput) {
    
  }

}
