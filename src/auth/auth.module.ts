import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [AuthService, FirebaseService],
  controllers: [AuthController],
})
export class AuthModule {}
