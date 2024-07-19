import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { AuthService } from '../../services/auth/auth.service';
import { TokenDTO } from '../../type/login';
import { UpdateAppointmentModel } from '../../type/appointment';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Router } from '@angular/router';
import { FormValidationComponent } from '../form-validation/form-validation/form-validation.component';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogContent,
    MatNativeDateModule,
    MatInputModule,
    FormValidationComponent,
  ],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class UpdateAppointmentComponent implements OnInit{
  private dateTimeService = inject(DateTimeService);
  private authService = inject(AuthService);
  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);

  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  token: TokenDTO = this.authService.getTokenInfo();
  hours: string[] = this.dateTimeService.availableHours;
  selectedHour: string = '08:00:00';
  scheduleOptions: string[] = ['Agendado', 'Realizado', 'Não Realizado'];
  selectedOption: number = 1;
  birthDate: string = this.dateTimeService.formattedDate(this.token.birthDate);
  name: string = this.token.name;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      appointmentDate: string;
      appointmentTime: string;
      scheduled: number;
    },
    private dialogRef: MatDialogRef<UpdateAppointmentComponent>
  ) {}

  ngOnInit(): void {
    this._adapter.setLocale(this._locale());
  }

  appointmentForm = new FormGroup({
    name: new FormControl({ value: this.name, disabled: true }),
    birthDate: new FormControl({ value: this.birthDate, disabled: true }),
    appointmentDate: new FormControl(this.data.appointmentDate, [
      Validators.required,
      this.dateTimeService.validateAppointmentDate(),
    ]),
    appointmentTime: new FormControl(this.selectedHour),
    scheduled: new FormControl(1),
  });

  handleHourChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const hour = target.value;
    this.selectedHour = hour + ':00';
  }

  handleScheduleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    switch (target.value) {
      case 'Realizado':
        this.selectedOption = 2;
        break;
      case 'Não Realizado':
        this.selectedOption = 3;
        break;
      default:
        this.selectedOption = 1;
        break;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  handleFormSubmit() {
    this.authService.checkIsTokenExpiring();
    if (this.appointmentForm.valid) {
      const date = this.appointmentForm.value.appointmentDate as string;
      const appointment: UpdateAppointmentModel = {
        appointmentDate: this.dateTimeService.formattedDate(date),
        appointmentTime: this.selectedHour,
        scheduled: this.selectedOption,
      };
      this.appointmentService
        .updateAppointment(this.data.id, appointment)
        .subscribe(() => {
          this.appointmentService.getAppointmentsFromApi(null).subscribe();
        });
    }
  }
}
