import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  async login() {
    const result = await signInWithPopup(
      this.auth,
      new GoogleAuthProvider()
    );

    return result.user;
  }

  logout() {
    return signOut(this.auth);
  }
}