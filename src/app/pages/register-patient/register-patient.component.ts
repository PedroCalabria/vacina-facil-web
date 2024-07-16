import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Patient } from '../../type/patient';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [FormsModule, LogoComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {
  patientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthDate: new FormControl()
  });

  handleFormSubmit() {
    if (this.patientForm.valid) {
      console.log('register')
    }
  }
}
