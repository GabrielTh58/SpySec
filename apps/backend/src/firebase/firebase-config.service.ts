import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseConfigService {
  constructor(private readonly apiKey: string) {

    if (!apiKey) {
      throw new Error('Firebase API key is not configured.');
    }
  }
}

