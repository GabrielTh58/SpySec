import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin'; 
import { AuthProvider, FirebaseUserData } from '@spysec/auth';

@Injectable()
export class FirebaseAuthAdapter implements AuthProvider { 
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly admin: typeof firebaseAdmin,
  ) {}

  async verifyGoogleToken(idToken: string): Promise<FirebaseUserData> {
    try {      
      const decodedToken = await this.admin.auth().verifyIdToken(idToken);

      return {
        uid: decodedToken.uid,
        email: decodedToken.email!,
        emailVerified: decodedToken.email_verified || false,
        displayName: decodedToken.name || '',
        photoURL: decodedToken.picture,
      };
    } catch (error: any) {
      console.error('Firebase Verify Error:', error);    
      throw new Error('INVALID_TOKEN');  
    }
  }

  async deleteAccount(uid: string): Promise<void> {
    try {
        await this.admin.auth().deleteUser(uid);
    } catch (error) {        
        console.error(`Erro ao deletar usuário ${uid}:`, error);
    }
  }
}