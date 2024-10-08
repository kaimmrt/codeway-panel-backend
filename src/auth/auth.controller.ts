import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterRequest } from './request/register.request';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() registerData: RegisterRequest) {
    return await this.authService.register(registerData);
  }

  @Post('login')
  public async login(@Body() loginData: LoginRequest) {
    return this.authService.login(loginData);
  }

  @Get('profile')
  public async getProfile() {
    return await this.authService.getProfile();
  }
}
