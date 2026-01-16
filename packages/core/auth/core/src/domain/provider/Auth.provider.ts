export interface FirebaseUserData {
    uid: string;              
    email: string;
    emailVerified: boolean;
    displayName: string;
    photoURL?: string;
}


export abstract class AuthProvider {
    abstract verifyGoogleToken(token: string): Promise<FirebaseUserData>;
    abstract deleteAccount(uid: string): Promise<void>;
  }