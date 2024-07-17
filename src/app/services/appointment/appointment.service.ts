import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Appointment } from '../../type/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private _http = inject(HttpClient);

  registerAppointment(values: Appointment) {
    const appointment: Appointment = {
      idPatient: values.idPatient,
      appointmentDate: values.appointmentDate,
      appointmentTime: values.appointmentTime,
      scheduled: values.scheduled
    }
    return this._http.post<Appointment[]>(
      '/api/Appointment/InsertAppointment',
      appointment
    )
  }
}
