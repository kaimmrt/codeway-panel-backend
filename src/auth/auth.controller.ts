import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterRequest } from './request/register.request';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() registerData: RegisterRequest) {
    return await this.authService.register(registerData);
  }

  @Post('signin')
  public async login(@Body() loginData: LoginRequest) {
    return this.authService.login(loginData);
  }

  @Post('logout')
  public async logout() {
    return this.authService.logout();
  }

  @Get('profile')
  public async getProfile() {
    return await this.authService.getProfile();
  }
}
