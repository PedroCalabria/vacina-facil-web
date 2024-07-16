import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../type/login';
import { LogoComponent } from '../components/logo/logo.component';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    LogoComponent,
    RouterLink
  ],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: Login = {
    email: '',
    password: '',
  };

  submitLogin(login: NgForm) {
    if (login.valid) {
      this.authService.login(login.value).subscribe(() => {
        this.router.navigate(['/appointments']);
      });
    }
  }
}
