import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../type/patient';
import { PatientService } from '../../services/patient/patient.service';
import { NotificationService } from '../../services/notification/notification.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormValidationComponent } from "../../components/form-validation/form-validation/form-validation.component";
import { DateTimeService } from '../../services/date-time/date-time.service';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormValidationComponent
],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss',
})
export class RegisterPatientComponent {
  private patientService = inject(PatientService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private dateTimeService = inject(DateTimeService);

  patientForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    email: new FormControl<string>('', Validators.email),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    birthDate: new FormControl<Date | null>(null, [
      Validators.required,
      this.dateTimeService.validateBirthDate(),
    ]),
  });

  handleFormSubmit() {
    if (this.patientForm.valid) {
      const values = this.patientForm.value;

      if (!values.birthDate) {
        values.birthDate = new Date();
      }

      const patientValues: Patient = values as Patient;

      this.patientService.registerUser(patientValues).subscribe(() => {
        this.notificationService.showNotification(
          `Paciente ${values.email} cadastrado com sucesso!`
        );
        this.router.navigate(['/login']);
      });
    }
  }
}
