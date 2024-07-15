import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../type/login';
import { LogoComponent } from "../components/logo/logo.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, LogoComponent]
})
export class LoginComponent {
  loginForm: Login = {
    login: '',
    password: ''
  }

  submitLogin(login: NgForm) {
    if (login.valid) {
      console.log('login')
    } else {
      console.log('invalid')
    }
  }
}
