import { DynamicModule, Global, Module } from '@nestjs/common';
import { FirebaseConfigService } from './firebase-config.service';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';


@Global()
@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    const firebaseConfigProvider = {
        provide: FirebaseConfigService,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const apiKey = configService.get<string>('FIREBASE_API_KEY');
            if (!apiKey) {
                throw new Error('Firebase API key is not configured.');
            }
            
            return new FirebaseConfigService(apiKey);
        }
    }

    const firebaseProvider = {
        provide: 'FIREBASE_ADMIN',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const credentials = configService.get<string>('FIREBASE_CREDENTIALS');
            if (!credentials) {
                throw new Error('Firebase credentials are not configured.');
            }

            const serviceAccount = JSON.parse(credentials);
            firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(serviceAccount),
            });
            
            return firebaseAdmin;
        }
    }

    return {
        module: FirebaseModule,
        providers: [firebaseConfigProvider, firebaseProvider],
        exports: [firebaseConfigProvider, firebaseProvider],
    }
  }
}
