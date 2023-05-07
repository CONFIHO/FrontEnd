import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { IAuthService } from '../interfaces/i-auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService{

  constructor(private auth: Auth) {}

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
