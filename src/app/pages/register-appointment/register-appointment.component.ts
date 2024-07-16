import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register-appointment',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatOption,
],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.scss',
})
export class RegisterAppointmentComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  selectedHour: string = '';
  hours: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  appointmentForm = new FormGroup({
    name: new FormControl(''),
    birthDate: new FormControl(),
    appointmentDate: new FormControl(),
    appointmentTime: new FormControl(),
  });

  minDate = new Date(8, 0, 0);
  maxDate = new Date(20, 0, 0);

  handleHourChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedHour = target.value;
    console.log('Selected hour:', this.selectedHour);
  }


  handleDifferentPatient() {
    this.authService.logout();
    this.router.navigate(['/register']);
  }

  handleFormSubmit() {
    if (this.appointmentForm.valid) {
      console.log('Appointment registered');
    }
  }
}
