
import { FirebaseService } from '../../firebase/firebase.service'; 
import { Injectable } from '@nestjs/common';
import {
  AuthProvider,
  AuthResult,
  FirebaseUserData,
  LoginWithGoogleInput,
} from '@spysec/auth';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';


@Injectable()
export class FirebaseAuthAdapter implements AuthProvider {
  constructor(
    private readonly firebaseService: FirebaseService 
  ) {}

  async registerWithEmail(input: RegisterUserDTO): Promise<AuthResult> {
    try {
        const userRecord = await this.firebaseService.createUser({
        email: input.email,
        password: input.password,
        displayName: input.name,
        emailVerified: false,
      });

      const accessToken = await this.firebaseService.createCustomToken(userRecord.uid);

      return {
        firebaseUser: {
          uid: userRecord.uid,
          email: userRecord.email!,
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
        },
        accessToken,
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') throw new Error('EMAIL_ALREADY_EXISTS');
      if (error.code === 'auth/invalid-email') throw new Error('INVALID_EMAIL');
      if (error.code === 'auth/weak-password') throw new Error('INVALID_PASSWORD');
      
      throw new Error(`FIREBASE_ERROR: ${error.message}`);
    }
  }

  async loginWithEmail(input: LoginUserDTO): Promise<AuthResult> {
    try {      
      const loginResponse = await this.firebaseService.signInWithEmailAndPassword(
        input.email,
        input.password
      );
      
      if (!loginResponse.localId || !loginResponse.idToken) {
        throw new Error('INVALID_CREDENTIALS');
      }
      
      const userRecord = await this.firebaseService.getUser(loginResponse.localId);
      
      return {
        firebaseUser: {
          uid: userRecord.uid,
          email: userRecord.email!,
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
        },
        accessToken: loginResponse.idToken,
      };
    } catch (error: any) {
      if (
        error.response?.data?.error?.message === 'EMAIL_NOT_FOUND' ||
        error.response?.data?.error?.message === 'INVALID_PASSWORD'
      ) {
        throw new Error('INVALID_CREDENTIALS');
      }
      if (
        error.response?.data?.error?.message === 'USER_DISABLED'
      ) {
        throw new Error('USER_DISABLED');
      }
      throw new Error(`FIREBASE_ERROR: ${error.message}`);
    }
  }

  // --------------------

  async loginWithGoogle(input: LoginWithGoogleInput): Promise<AuthResult> {
    try {
      // 1. Valida o ID Token do Google
      const decodedToken = await this.firebaseService.verifyToken(input.idToken);

      // 2. Busca dados completos do usuário
      const userRecord = await this.firebaseService.getUser(decodedToken.uid);

      // 3. Gera novo token customizado
      const accessToken = await this.firebaseService.createCustomToken(userRecord.uid);

      // 4. Retorna dados formatados
      return {
        firebaseUser: {
          uid: userRecord.uid,
          email: userRecord.email!,
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
        },
        accessToken,
      };
    } catch (error: any) {
      if (error.code === 'auth/id-token-expired') {
        throw new Error('TOKEN_EXPIRED');
      }
      if (error.code === 'auth/invalid-id-token') {
        throw new Error('INVALID_TOKEN');
      }
      throw new Error(`FIREBASE_ERROR: ${error.message}`);
    }
  }

  async verifyToken(token: string): Promise<FirebaseUserData> {
    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      const userRecord = await this.firebaseService.getUser(decodedToken.uid);

      return {
        uid: userRecord.uid,
        email: userRecord.email!,
        emailVerified: userRecord.emailVerified,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
      };
    } catch (error: any) {
      if (error.code === 'auth/id-token-expired') {
        throw new Error('TOKEN_EXPIRED');
      }
      throw new Error('INVALID_TOKEN');
    }
  }

  async sendEmailVerification(firebaseUid: string): Promise<void> {
    try {
      const user = await this.firebaseService.getUser(firebaseUid);
      const link = await this.firebaseService.generateEmailVerificationLink(user.email!);
      // TODO: Enviar o email usando serviço externo de email.
      console.log('📧 Email verification link:', link);
    } catch (error: any) {
      console.error('Failed to send verification email:', error);
      throw new Error('FAILED_TO_SEND_EMAIL');
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      const link = await this.firebaseService.generatePasswordResetLink(email);
      // TODO: Enviar o email usando serviço externo de email.
      console.log('🔑 Password reset link:', link);
    } catch (error: any) {
      console.error('Failed to send password reset:', error);
      throw new Error('FAILED_TO_SEND_EMAIL');
    }
  }

  async deleteAccount(firebaseUid: string): Promise<void> {
    try {
      await this.firebaseService.deleteUser(firebaseUid);
    } catch (error: any) {
      console.error('Failed to delete Firebase account:', error);
      throw new Error('FAILED_TO_DELETE_ACCOUNT');
    }
  }
}