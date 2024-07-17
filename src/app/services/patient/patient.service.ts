import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Patient } from '../../type/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private _http = inject(HttpClient);

  registerUser(values: Patient) {
    const patient: Patient = {
      name: values.name,
      email: values.email,
      birthDate: values.birthDate,
      password: values.password
    }
    return this._http.post<Patient[]>(
      '/api/Patient/InsertPatient',
      patient
    )
  }
}
