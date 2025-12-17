import {
  Auth,
  AuthProvider,
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../config/app";
import { User } from "@spysec/auth";
import axios from "axios";

export interface LoginResult {
  user: User;
  isNewUser: boolean;
  accessToken: string;
  refreshToken?: string;
}

type TokenUpdateCallback = (token: string | null) => void;

export class FirebaseAuthProvider {
  private auth: Auth;
  private providers = [
    { id: "google.com", fn: () => new GoogleAuthProvider() },
  ];
  private tokenObserver: TokenUpdateCallback | null = null;

  constructor() {
    this.auth = getAuth(app);
    this.initInternalListener();
  }

  async loginWithProvider(providerId: string): Promise<LoginResult> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const provider: AuthProvider | null =
      this.providers.find((p) => p.id === providerId)?.fn() ?? null;

    if (!provider) throw new Error("Provedor de autenticação não encontrado");

    const credentials = await signInWithPopup(this.auth, provider);
    console.log("credentials", credentials);

    const idToken = await credentials.user.getIdToken();

    let response;
    try {
      response = await axios.post(
        `${apiUrl}/auth/google`,
        {
          idToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      await this.logout();
      throw new Error(
        error.response?.data?.message || "Falha na requisição ao Backend"
      );
    }

    const data = response.data;

    return {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      isNewUser: data.isNewUser,
    };
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  public setTokenObserver(fn: TokenUpdateCallback) {
    this.tokenObserver = fn;

    // Se já tinha um listener antes, desliga para não duplicar
    if (this.unsubscribe) {
        this.unsubscribe();
    }

    // AGORA SIM: Iniciamos o listener.
    // Garantimos que 'this.tokenObserver' (fn) já existe.
    this.unsubscribe = onIdTokenChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        // Como estamos dentro do setTokenObserver, fn é garantido
        fn(token); 
      } else {
        fn(null);
      }
    });
  }

  private initInternalListener() {
    onIdTokenChanged(this.auth, async (user) => {
      if (!this.tokenObserver) return;

      if (user) {
        const token = await user.getIdToken();
        this.tokenObserver(token)
      }else{
        this.tokenObserver(null)
      }
    });
  }
}
