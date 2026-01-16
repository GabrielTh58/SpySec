import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  //onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../config/app";
import { ProfileType, User } from "@spysec/auth";
import axios from "axios";
import { UserDTO } from "@spysec/auth-adapter";

export interface LoginResult {
  user: UserDTO;   
  accessToken: string;
  isNewUser: boolean;
}

export class FirebaseAuthProvider {
  private auth: Auth;
  constructor() {
    this.auth = getAuth(app);
  }

  async loginWithGoogle(profileType: ProfileType = ProfileType.PERSONAL): Promise<LoginResult> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(this.auth, provider);
      const idToken = await credentials.user.getIdToken();
      console.log("credentials", credentials);    

      const response = await axios.post(
          `${apiUrl}/auth/google`,
          {   
            idToken,
            profileType
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      const data = response.data;

      return {
        user: data.user,
        accessToken: data.accessToken,
        isNewUser: data.isNewUser 
      };
    } 
    catch (error: any) {
      await this.logout();  
      const msg = error.response?.data?.message || error.message || "Error authenticating with Google";
      throw new Error(msg);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
