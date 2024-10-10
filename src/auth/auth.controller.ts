import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequest } from './request/register.request';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';
import { ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './response/login.response';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registerData: RegisterRequest,
  ): Promise<UserRecord> {
    return await this.authService.register(registerData);
  }

  @Post('signin')
  public async login(@Body() loginData: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginData);
  }

  // @Get('profile')
  // public async getProfile() {
  //   return await this.authService.getProfile();
  // }
}
