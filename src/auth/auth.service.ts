import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { RegisterRequest } from './request/register.request';
import { LoginRequest } from './request/login.request';

@Injectable()
export class AuthService {
  private readonly firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIRABASE_AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };

  private readonly app = initializeApp(this.firebaseConfig);
  private readonly auth = firebase.getAuth(this.app);

  public async register(registerData: RegisterRequest) {
    try {
      const record = await firebase.createUserWithEmailAndPassword(
        this.auth,
        registerData.email,
        registerData.password,
      );
      return record;
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Registration failed');
    }
  }

  public async login(loginData: LoginRequest) {
    try {
      const userCredential = await firebase.signInWithEmailAndPassword(
        this.auth,
        loginData.email,
        loginData.password,
      );

      const token = await userCredential.user?.getIdToken();
      return {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        expiresIn: userCredential['_tokenResponse'].expiresIn,
        token,
      };
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed');
    }
  }

  public async logout() {
    try {
      await firebase.signOut(this.auth);
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Logout failed', error);
      throw new Error('Logout failed');
    }
  }

  public async getProfile() {
    try {
      const user = this.auth.currentUser;

      if (!user) {
        throw new Error('User not found');
      }

      return {
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error('Error fetching profile', error);
      throw new Error('Could not fetch profile');
    }
  }
}
