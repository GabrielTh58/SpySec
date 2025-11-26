export interface RegisterWithEmailInput {
    email: string;
    password: string;
    name: string;
}

export interface LoginWithEmailInput {
    email: string;
    password: string;
}

export interface LoginWithGoogleInput {
    idToken: string; 
}

export interface FirebaseUserData {
    uid: string;              
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
}

export interface AuthResult {
    firebaseUser: FirebaseUserData;
    accessToken: string;    
}

export interface AuthProvider {
    registerWithEmail(input: RegisterWithEmailInput): Promise<AuthResult>;
    loginWithEmail(input: LoginWithEmailInput): Promise<AuthResult>;
    loginWithGoogle(input: LoginWithGoogleInput): Promise<AuthResult>;
    verifyToken(token: string): Promise<FirebaseUserData>;
    sendEmailVerification(firebaseUid: string): Promise<void>;
    sendPasswordReset(email: string): Promise<void>;
    deleteAccount(firebaseUid: string): Promise<void>;
}