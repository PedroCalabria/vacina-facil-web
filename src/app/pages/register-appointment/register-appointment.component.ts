import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';
import { Appointment, GroupedAppointmentDTO } from '../../type/appointment';
import { NotificationService } from '../../services/notification/notification.service';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { TokenDTO } from '../../type/login';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FormValidationComponent } from '../../components/form-validation/form-validation/form-validation.component';

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
    DatePipe,
    FormValidationComponent,
  ],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class RegisterAppointmentComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private dateTimeService = inject(DateTimeService);
  private notificationService = inject(NotificationService);
  private appointmentService = inject(AppointmentService);
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);

  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  token: TokenDTO = this.authService.getTokenInfo();
  hours: string[] = this.dateTimeService.availableHours;
  selectedHour: string = '08:00:00';
  birthDate: string = '';
  name: string = '';

  appointmentForm = new FormGroup({
    appointmentDate: new FormControl<string | null>(null, [
      Validators.required,
      this.dateTimeService.validateAppointmentDate(),
    ]),
    appointmentTime: new FormControl('08:00'),
  });

  constructor() {
    this.birthDate = this.dateTimeService.formattedDate(this.token.birthDate);
    this.name = this.token.name;
    this._adapter.setLocale(this._locale());
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const appointments = JSON.parse(
        savedAppointments
      ) as GroupedAppointmentDTO[];
      this.appointmentService.setAppointments(appointments);
    }
  }

  handleHourChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const hour = target.value;
    this.selectedHour = hour + ':00';
  }

  handleDifferentPatient(): void {
    this.authService.logout();
    this.router.navigate(['/register']);
  }

  handleFormSubmit(): void {
    this.authService.checkIsTokenExpiring();
    if (this.appointmentForm.valid) {
      const date = this.appointmentForm.value.appointmentDate as string;
      const appointment: Appointment = {
        idPatient: this.token.idPatient,
        appointmentDate: this.dateTimeService.formattedDate(date),
        appointmentTime: this.selectedHour,
        scheduled: 1,
      };
      this.appointmentService.registerAppointment(appointment).subscribe(() => {
        this.notificationService.showNotification(
          `Agendamento realizado com sucesso!`
        );
        this.router.navigate(['/appointments']);
      });
      localStorage.removeItem('appointments');
    }
  }
}
