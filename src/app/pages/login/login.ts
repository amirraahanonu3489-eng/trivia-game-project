import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html'
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async login() {
    try {
      console.log("LOGIN CLICKED");

      const user = await this.auth.login();

      if (user) {
        console.log("LOGIN SUCCESS:", user);
        this.router.navigate(['/setup']);
      } else {
        console.log("NO USER RETURNED");
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  }
}