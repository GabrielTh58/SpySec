import { Injectable } from "@nestjs/common";
import { CryptoProvider } from "@spysec/auth";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements CryptoProvider{
    async encrypt(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password,salt)
    }

    async compare(password: string, encryptedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, encryptedPassword)
    }
} 