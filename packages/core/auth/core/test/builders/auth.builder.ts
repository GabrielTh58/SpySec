import { AuthResult, FirebaseUserData } from "../../src/user/provider/Auth.provider";

export class AuthResultBuilder {
    private firebaseUser: FirebaseUserData;
    private accessToken: string;

    constructor() {
        this.firebaseUser = {
            uid: 'firebase-test-uid',
            email: 'test@example.com',
            emailVerified: true,
            displayName: 'Test User',
            photoURL: undefined,
        };
        this.accessToken = 'mock-access-token';
    }

    withFirebaseUid(uid: string): AuthResultBuilder {
        this.firebaseUser.uid = uid;
        return this;
    }

    withEmail(email: string): AuthResultBuilder {
        this.firebaseUser.email = email;
        return this;
    }

    withDisplayName(name: string | undefined): AuthResultBuilder {
        this.firebaseUser.displayName = name;
        return this;
    }

    withPhotoURL(url: string | undefined): AuthResultBuilder {
        this.firebaseUser.photoURL = url;
        return this;
    }

    withAccessToken(token: string): AuthResultBuilder {
        this.accessToken = token;
        return this;
    }

    verified(): AuthResultBuilder {
        this.firebaseUser.emailVerified = true;
        return this;
    }

    unverified(): AuthResultBuilder {
        this.firebaseUser.emailVerified = false;
        return this;
    }

    asGoogleAuth(): AuthResultBuilder {
        this.firebaseUser.emailVerified = true;
        this.firebaseUser.displayName = 'Google User';
        this.firebaseUser.photoURL = 'https://photo.url';
        return this;
    }

    withoutDisplayName(): AuthResultBuilder {
        this.firebaseUser.displayName = undefined;
        return this;
    }

    build(): AuthResult {
        return {
            firebaseUser: this.firebaseUser,
            accessToken: this.accessToken,
        };
    }
}