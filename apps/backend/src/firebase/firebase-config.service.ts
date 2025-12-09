import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseConfigService {
  constructor(private readonly _apiKey: string) {

    if (!_apiKey) {
      throw new Error('Firebase API key is not configured.');
    }
  }

  get apiKey(): string {
    return this._apiKey;
  }
}

