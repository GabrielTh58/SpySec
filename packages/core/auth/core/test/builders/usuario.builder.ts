import { ProfileType, User } from "../../src/user/model/User.entity"; 


export class UserBuilder {
  
  private props = {
    id: "uuid-v4-padrao-para-restore",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "StrongPassword@123",
    firebaseUid: "firebase-uid-123",
    profileType: ProfileType.PERSONAL,
    imageURL: null as string | null,
    isEmailVerified: false,
    provider: "EMAIL" 
  };

  withName(name: string): UserBuilder {
    this.props.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.props.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.props.password = password;
    return this;
  }

  withFirebaseUid(uid: string): UserBuilder {
    this.props.firebaseUid = uid;
    return this;
  }

  withImageURL(url: string): UserBuilder {
    this.props.imageURL = url;
    return this;
  }

  withId(id: string): UserBuilder {
    this.props.id = id;
    return this;
  }

  asCorporate(): UserBuilder {
    this.props.profileType = ProfileType.CORPORATE;
    return this;
  }

  asPersonal(): UserBuilder {
    this.props.profileType = ProfileType.PERSONAL;
    return this;
  }

  buildWithPassword(): User {
    const result = User.createWithPassword({
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      profileType: this.props.profileType
    });

    if (result.failed) {  
      throw new Error(`Build failed: ${result.errors}`);
    }

    return result.value!;
  }
 
  buildWithGoogle(): User {
    const result = User.createWithGoogle({
      name: this.props.name,
      email: this.props.email,
      firebaseUid: this.props.firebaseUid,
      profileType: this.props.profileType,
      imageURL: this.props.imageURL
    });

    if (result.failed) {
      throw new Error(`Build failed: ${result.errors}`);
    }

    return result.value!;
  }

  buildRestored(): User {
    return User.restore({
      id: this.props.id,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password, 
      firebaseUid: this.props.firebaseUid,
      imageURL: this.props.imageURL,
      profileType: this.props.profileType,
      provider: this.props.provider, 
      isEmailVerified: this.props.isEmailVerified,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}