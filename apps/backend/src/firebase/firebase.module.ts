import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    const firebaseProvider = {
        provide: 'FIREBASE_ADMIN',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const credentials = configService.get<string>('FIREBASE_ADMIN_CREDENTIALS');
            if (!credentials) {
                throw new Error('Firebase credentials are not configured.');
            }

            const serviceAccount = JSON.parse(credentials);            
            
            if (!firebaseAdmin.apps.length) {
                firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(serviceAccount),
                });
            }

            return firebaseAdmin;
        }
    }

    return {
        module: FirebaseModule,
        providers: [firebaseProvider],
        exports: [firebaseProvider],
    }
  }
}
