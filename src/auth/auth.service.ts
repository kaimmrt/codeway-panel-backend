import { Injectable } from '@nestjs/common';
import { RegisterRequest } from './request/register.request';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async register(registerData: RegisterRequest): Promise<UserRecord> {
    const db = getFirestore();
    try {
      const userRecord = await this.firebaseService.getAuth().createUser({
        email: registerData.email,
        password: registerData.password,
      });
      await db.collection('users').doc(userRecord.uid).set({
        email: registerData.email,
        countryCode: registerData.countryCode,
      });
      return userRecord;
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Registration failed');
    }
  }

  public async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(loginData.idToken);
      const uid = decodedToken.uid;

      const userDoc = await this.firebaseService
        .getFirestore()
        .collection('users')
        .doc(uid)
        .get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      return {
        userId: decodedToken.uid,
        email: decodedToken.email,
        countryCode: userData.countryCode,
        token: loginData.idToken,
      };
    } catch (err: any) {
      console.log(err);
      throw new Error('Unauthorized');
    }
  }

  // public async getProfile() {
  //   try {
  //     const user = this.auth.currentUser;

  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     return {
  //       email: user.email,
  //       displayName: user.displayName,
  //     };
  //   } catch (error) {
  //     console.error('Error fetching profile', error);
  //     throw new Error('Could not fetch profile');
  //   }
  // }
}
