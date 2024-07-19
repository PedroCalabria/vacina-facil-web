import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Patient } from '../../type/patient';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private _http = inject(HttpClient);
  private authService = inject(AuthService);

  registerUser(values: Patient): Observable<Patient[]> {
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

  deleteUser(id: number): Observable<Patient[]> {
    const params = new HttpParams().set('idPatient', id);
    return this._http.delete<Patient[]>(
      '/api/Patient/DeletePatient',
      { params }
    ).pipe(
      tap(() => {
        this.authService.logout();
      })
    );
  }
}
