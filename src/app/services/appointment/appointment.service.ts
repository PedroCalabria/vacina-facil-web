import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Appointment, GroupedAppointmentDTO } from '../../type/appointment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private _http = inject(HttpClient);

  private appointments = new BehaviorSubject<GroupedAppointmentDTO[]>([]);
  appointments$ = this.appointments.asObservable();

  registerAppointment(values: Appointment) {
    const appointment: Appointment = {
      idPatient: values.idPatient,
      appointmentDate: values.appointmentDate,
      appointmentTime: values.appointmentTime,
      scheduled: values.scheduled,
    };
    return this._http.post<Appointment[]>(
      '/api/Appointment/InsertAppointment',
      appointment
    );
  }

  setAppointments(appointments: GroupedAppointmentDTO[]) {
    this.appointments.next(appointments);
  }

  getAppointmentsFromApi(date: string | null) {
    if (date) {
      const params = new HttpParams().set('date', date.toString());

      return this._http.get<GroupedAppointmentDTO[]>(
        '/api/Appointment/GetListAppointmentsPatientsByDate',
        { params }
      ).pipe(
        tap((appointments: GroupedAppointmentDTO[]) => {
          this.appointments.next(appointments);
          localStorage.setItem('appointments', JSON.stringify(appointments))
        })
      );
    }
    return this._http.get<GroupedAppointmentDTO[]>(
      '/api/Appointment/GetListAppointmentsPatients'
    ).pipe(
      tap((appointments: GroupedAppointmentDTO[]) => {
        this.appointments.next(appointments);
        localStorage.setItem('appointments', JSON.stringify(appointments))
      })
    );
  }
}
