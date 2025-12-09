import { Inject, Injectable } from '@nestjs/common';
import { CreateRequest, UserRecord } from 'firebase-admin/auth';
import * as firebaseAdmin from 'firebase-admin';
import { FirebaseConfigService } from './firebase-config.service';
import axios from 'axios';


@Injectable()
export class FirebaseService {    
    private readonly apiKey: string

    constructor(
        firebaseConfig: FirebaseConfigService,
        @Inject('FIREBASE_ADMIN') private readonly firebase: typeof firebaseAdmin
    ) {
        this.apiKey = firebaseConfig.apiKey
    }

    async createUser(data: CreateRequest): Promise<UserRecord> {        
        return await this.firebase.auth().createUser(data);
    }

    async signInWithEmailAndPassword(email:string, password:string){
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`
        return await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true
        })
    }

    async createCustomToken(uid: string): Promise<string> {
        return await this.firebase.auth().createCustomToken(uid);
    }

    async verifyToken(token: string): Promise<firebaseAdmin.auth.DecodedIdToken> {
        return await this.firebase.auth().verifyIdToken(token);
    }

    async getUser(uid: string): Promise<UserRecord> {
        return await this.firebase.auth().getUser(uid);
    }

    async generateEmailVerificationLink(email: string): Promise<string> {
        return await this.firebase.auth().generateEmailVerificationLink(email);
    }

    async generatePasswordResetLink(email: string): Promise<string> {
        return await this.firebase.auth().generatePasswordResetLink(email);
    }

    async deleteUser(uid: string): Promise<void> {
        await this.firebase.auth().deleteUser(uid);
    }

    private async sendPostRequest(url:string, data:any){
        const response = await axios.post(url,data,{
            headers: { 'Content-Type': "application/json"},
        })

        return response.data
    }
}
