import { UserCredential } from "@angular/fire/auth";

export abstract class IAuthService {

    abstract login(email: string, password: string): Promise<UserCredential>;

    abstract logout(): Promise<void>;
}
