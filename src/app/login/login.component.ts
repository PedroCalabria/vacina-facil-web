import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../type/login';
import { LogoComponent } from '../components/logo/logo.component';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment/appointment.service';
import { FormValidationComponent } from "../components/form-validation/form-validation/form-validation.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    LogoComponent,
    RouterLink,
    FormValidationComponent
],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private appointmentService = inject(AppointmentService);

  loginForm: Login = {
    email: '',
    password: '',
  };

  submitLogin(login: NgForm) {
    if (login.valid) {
      this.authService.login(login.value).subscribe(() => {
        this.appointmentService.getAppointmentsFromApi(null).subscribe();
        this.router.navigate(['/appointments']);
      });
    }
  }
}
