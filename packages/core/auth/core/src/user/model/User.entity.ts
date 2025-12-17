import { Entity, EntityProps, StrongPassword } from "@spysec/shared";
import { Id, Email, UserName, Result } from "@spysec/shared";

export enum ProfileType {
  PERSONAL = "PERSONAL",
  CORPORATE = "CORPORATE",
}

export enum ProviderType {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
}

export interface UserProps extends EntityProps {
  firebaseUid?: string | null;
  name: UserName;
  password?: StrongPassword | null;
  email: Email;
  provider: ProviderType;
  profileType: ProfileType;
  isEmailVerified?: boolean;
  imageURL?: string | null;
  lastLoginAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestoreUserProps {
  id: string;
  firebaseUid?: string | null;
  name: string;
  email: string;
  password?: string | null;
  provider: string;
  profileType: string;
  isEmailVerified: boolean;
  imageURL?: string | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserWithPasswordDTO {
  name: string;
  email: string;
  password: string;
  profileType: ProfileType;
}

export interface CreateUserWithGoogleDTO {
  name: string;
  email: string;
  firebaseUid: string;
  profileType: ProfileType;
  imageURL?: string | null;
}

export class User extends Entity<User, UserProps> {
  constructor(props: UserProps, id: Id) {
    super(id, props);
  }

  static createWithPassword(props: CreateUserWithPasswordDTO): Result<User> {
    const nameResult = UserName.create(props.name);
    const emailResult = Email.create(props.email);
    const passResult = StrongPassword.create(props.password);

    const result = Result.combine([nameResult, emailResult, passResult]);
    if (result.failed) return Result.fail<User>(result.errors);

    return Result.ok(
      new User(
        {
          name: nameResult.value!,
          email: emailResult.value!,
          password: passResult.value!,
          provider: ProviderType.EMAIL,
          profileType: props.profileType,
          isEmailVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          firebaseUid: null,
          imageURL: null,
          lastLoginAt: null,
        },
        Id.generate()
      )
    );
  }

  static createWithGoogle(props: CreateUserWithGoogleDTO): Result<User> {
    const nameResult = UserName.create(props.name);
    const emailResult = Email.create(props.email);

    const result = Result.combine([nameResult, emailResult]);
    if (result.failed) return Result.fail<User>(result.errors);

    return Result.ok(
      new User(
        {
          name: nameResult.value!,
          email: emailResult.value!,
          password: null,
          provider: ProviderType.GOOGLE,
          profileType: props.profileType,
          isEmailVerified: true,
          firebaseUid: props.firebaseUid,
          imageURL: props.imageURL ?? null,
          lastLoginAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        Id.generate()
      )
    );
  }

  static restore(props: RestoreUserProps): User {
    const nameVO = UserName.restore(props.name);
    const emailVO = Email.restore(props.email);
    const idVO = Id.restore(props.id);

    let passwordVO: StrongPassword | null = null;
    if (props.password) {
      const passResult = StrongPassword.createFromHash(props.password);
      if (passResult.succeeded) passwordVO = passResult.value!;
    }

    return new User(
      {
        firebaseUid: props.firebaseUid ?? null,
        name: nameVO,
        email: emailVO,
        password: passwordVO,
        provider: props.provider as ProviderType,
        profileType: props.profileType as ProfileType,
        isEmailVerified: props.isEmailVerified,
        imageURL: props.imageURL ?? null,
        lastLoginAt: props.lastLoginAt ?? null,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      idVO
    );
  }

  private clone(changes: Partial<UserProps>): User {
    return new User(
      {
        ...this.props,
        ...changes,
        updatedAt: new Date(),
      },
      this.id
    );
  }

  setEncryptedPassword(hashedPassword: string): Result<User> {
    const passwordHashVO = StrongPassword.createFromHash(hashedPassword);

    if (passwordHashVO.failed) {
      return Result.fail(passwordHashVO.errors);
    }

    return Result.ok(this.clone({ password: passwordHashVO.value }));
  }

  isCorporate(): boolean {
    return this.props.profileType === ProfileType.CORPORATE;
  }

  isPersonal(): boolean {
    return this.props.profileType === ProfileType.PERSONAL;
  }

  isOAuthUser(): boolean {
    return this.props.provider === ProviderType.GOOGLE;
  }

  recordLogin(): User {
    return this.clone({ lastLoginAt: new Date() });
  }

  setEmailVerified(): User {
    if (this.props.isEmailVerified) return this;

    return this.clone({
      isEmailVerified: true,
    });
  }

  updatePhoto(imageURL: string): User {
    return this.clone({ imageURL: imageURL });
    
  }

  changeProfileType(newType: ProfileType): User {
    if (this.props.profileType === newType) return this;
    return this.clone({ profileType: newType });
  }
 
  linkFirebaseAccount(uid: string): User {  
    if (this.props.firebaseUid === uid) return this;
  
    return this.clone({ firebaseUid: uid });
  }

  updateName(newName: string): Result<User> {
    const nameResult = UserName.create(newName);
    if (nameResult.failed) return Result.fail<User>(nameResult.errors);

    const updatedUser = this.clone({ name: nameResult.value! });
    return Result.ok(updatedUser);
  }

  updatePassword(newPassword: string): Result<User> {
    const passwordResult = StrongPassword.create(newPassword);
    if (passwordResult.failed) return Result.fail<User>(passwordResult.errors);

    const updatedUser = this.clone({ password: passwordResult.value });
    return Result.ok(updatedUser);
  }

  get idValue(): Id {
    return this.id as Id;
  }

  get name(): UserName {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): StrongPassword | null {
    return this.props.password ?? null;
  }

  get provider(): ProviderType {
    return this.props.provider;
  }

  get profileType(): ProfileType {
    return this.props.profileType;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified ?? false;
  }

  get firebaseUid(): string | null {
    return this.props.firebaseUid ?? null;
  }

  get imageURL(): string | null {
    return this.props.imageURL ?? null;
  }

  get lastLoginAt(): Date | null {
    return this.props.lastLoginAt ?? null;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }
}
