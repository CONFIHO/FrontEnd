import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { IAuthService } from '../interfaces/i-auth-service';
import { userStore } from '../pages/users.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService{

  public userEmail: string = ''

  constructor(private auth: Auth) {
    if(auth.currentUser != null){
      this.userEmail = auth.currentUser.email + ''
    }
  }

  logout() {
    return signOut(this.auth)
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
