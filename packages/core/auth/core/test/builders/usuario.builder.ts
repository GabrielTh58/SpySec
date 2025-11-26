import { Result } from "@spysec/shared";
import { ProfileType, User, UserProps } from "../../src/user/model/User.entity";

export class UserBuilder {
  private user: Partial<UserProps>;

  constructor() {
    this.user = {
      firebaseUid: "firebase-uid-default",
      name: "Test User",
      email: "test@example.com",
      provider: "email",
      profileType: ProfileType.PERSONAL,
      isEmailVerified: true,
      imageURL: undefined,
      lastLoginAt: undefined,
    };
  }

  build(): User {
    const result = User.create(this.user as UserProps);

    if (result.failed) {
      result.throwIfFailed();
    }

    return result.value!;
  }

  withFirebaseUid(uid: string): UserBuilder {
    this.user.firebaseUid = uid;
    return this;
  }

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withProvider(provider: "email" | "google"): UserBuilder {
    this.user.provider = provider;
    return this;
  }

  asPersonal(): UserBuilder {
    this.user.profileType = ProfileType.PERSONAL;
    return this;
  }

  asCorporate(): UserBuilder {
    this.user.profileType = ProfileType.CORPORATE;
    return this;
  }

  withEmailVerified(verified: boolean): UserBuilder {
    this.user.isEmailVerified = verified;
    return this;
  }

  withImageURL(url: string | null): UserBuilder {
    this.user.imageURL = url;
    return this;
  }

  withLastLoginAt(date: Date): UserBuilder {
    this.user.lastLoginAt = date;
    return this;
  }

  asGoogleUser(): UserBuilder {
    this.user.provider = "google";
    this.user.isEmailVerified = true; // Google sempre verifica
    return this;
  }

  asEmailUser(): UserBuilder {
    this.user.provider = "email";
    return this;
  }
  asUnverified(): UserBuilder {
    this.user.provider = "email";
    this.user.isEmailVerified = false;
    return this;
  }

  /**
   * Constrói retornando Result (útil para testar falhas)
   */
  buildResult(): Result<User> {
    return User.create(this.user as UserProps);
  }

  /**
   * Retorna props sem construir User (útil para testar validações)
   */
  buildProps(): UserProps {
    return this.user as UserProps;
  }
}
