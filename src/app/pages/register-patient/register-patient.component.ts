import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../type/patient';
import { PatientService } from '../../services/patient/patient.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [FormsModule, LogoComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {
  private patientService = inject(PatientService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  patientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthDate: new FormControl()
  });

  handleFormSubmit() {
    if (this.patientForm.valid) {
      const values = this.patientForm.value as Patient;
      this.patientService.registerUser(values).subscribe(() => {
        this.notificationService.showNotification(
          `Paciente ${values.email} cadastrado com sucesso!`
        );
        this.router.navigate(['/login']);
      });
    }
  }
}
