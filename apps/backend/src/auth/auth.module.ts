  import { Module } from '@nestjs/common';
  import { AuthController } from './auth.controller';
  import { AuthService } from './auth.service';
  import { FirebaseAuthAdapter } from './adapter/firebase-auth.adapter';
  import { PrismaUserRepository } from './adapter/prisma-user.repository';
  import { BcryptProvider } from './adapter/Bcrypt.adapter';
  import { AuthProvider, CryptoProvider, UserRepository } from '@spysec/auth';
import { AuthFacade } from '@spysec/auth-adapter';
 
  @Module({
    controllers: [AuthController],
    providers: [
      AuthService,
      FirebaseAuthAdapter,
      PrismaUserRepository,
      BcryptProvider,

      {
        provide: CryptoProvider,
        useClass: BcryptProvider  
      },
      {
        provide: AuthProvider,      
        useClass: FirebaseAuthAdapter 
      },
      {
        provide: UserRepository,    
        useClass: PrismaUserRepository 
      },
    
      {
        provide: AuthFacade, 
        useFactory: (
          userRepo: UserRepository, 
          crypto: CryptoProvider,   
          auth: AuthProvider        
        ) => {
          return new AuthFacade(userRepo, crypto, auth);
        },
        // define o que o Factory precisa receber
        inject: [UserRepository, CryptoProvider, AuthProvider]
      }
    ],
    exports:[AuthService],    
  })
  export class AuthModule {}
