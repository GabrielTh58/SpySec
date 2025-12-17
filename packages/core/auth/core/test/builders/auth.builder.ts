import { FirebaseUserData } from "../../src/user/provider/Auth.provider";

export class FirebaseDataBuilder {
    private data: FirebaseUserData;

    constructor() {        
        this.data = {
            uid: 'firebase-uid-mock',
            email: 'test@gmail.com',
            emailVerified: true,
            displayName: 'Test User',
            photoURL: undefined,
        };
    }

    withUid(uid: string): FirebaseDataBuilder {
        this.data.uid = uid;
        return this;
    }

    withEmail(email: string): FirebaseDataBuilder {
        this.data.email = email;
        return this;
    }

    withDisplayName(name: string): FirebaseDataBuilder {
        this.data.displayName = name;
        return this;
    }

    withPhotoURL(url: string): FirebaseDataBuilder {
        this.data.photoURL = url;
        return this;
    }

    verifiedEmail(): FirebaseDataBuilder {
        this.data.emailVerified = true;
        return this;
    }

    unverifiedEmail(): FirebaseDataBuilder {
        this.data.emailVerified = false;
        return this;
    }

    asGoogleUser(): FirebaseDataBuilder {
        this.data.emailVerified = true;
        this.data.displayName = 'Google User';
        this.data.photoURL = 'https://lh3.googleusercontent.com/a-/mock-photo';
        return this;
    }

    build(): FirebaseUserData {    
        return { ...this.data };
    }
}