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
import { MatRadioModule } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';
import { Appointment } from '../../type/appointment';
import { NotificationService } from '../../services/notification/notification.service';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { TokenDTO } from '../../type/login';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

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
  ],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.scss',
})
export class RegisterAppointmentComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private dateTimeService = inject(DateTimeService);
  private notificationService = inject(NotificationService);
  private appointmentService = inject(AppointmentService);

  token: TokenDTO = this.authService.getTokenInfo();
  hours: string[] = this.dateTimeService.availableHours;
  selectedHour: string = '';
  birthDate: string = '';
  name: string = '';

  appointmentForm = new FormGroup({
    appointmentDate: new FormControl(),
    appointmentTime: new FormControl(),
  });

  constructor() {
    this.birthDate = this.dateTimeService.formattedDate(this.token.birthDate);
    this.name = this.token.name;
  }

  handleHourChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    if (target.value === 'Selecione uma hora') {
      this.selectedHour = '';
    } else {
      const hour = target.value.split(':')[0];
      this.selectedHour = hour + ':00:00';
    }
  }

  handleDifferentPatient() {
    this.authService.logout();
    this.router.navigate(['/register']);
  }

  handleFormSubmit() {
    this.authService.checkIsTokenExpiring();
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        idPatient: this.token.idPatient,
        appointmentDate: this.dateTimeService.formattedDate(
          this.appointmentForm.value.appointmentDate
        ),
        appointmentTime: this.selectedHour,
        scheduled: 1,
      };
      this.appointmentService.registerAppointment(appointment).subscribe(() => {
        this.notificationService.showNotification(
          `Agendamento realizado com sucesso!`
        );
        this.router.navigate(['/appointments']);
      });
    }
  }
}
