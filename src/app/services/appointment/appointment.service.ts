import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Appointment,
  GroupedAppointmentDTO,
  UpdateAppointmentModel,
  UpdateAppointmentModelFull,
} from '../../type/appointment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private _http = inject(HttpClient);

  private appointments = new BehaviorSubject<GroupedAppointmentDTO[]>([]);
  appointments$ = this.appointments.asObservable();

  private numberAppointments = new BehaviorSubject<number>(0);
  numberAppointments$ = this.numberAppointments.asObservable();

  constructor() {
    this.numberAppointments$ = this.appointments$.pipe(
      map(appointments => appointments.reduce((sum, appointment) => sum + appointment.count, 0))
    );
  }

  registerAppointment(values: Appointment): Observable<Appointment[]> {
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

  setAppointments(appointments: GroupedAppointmentDTO[]): void {
    this.appointments.next(appointments);
  }

  getAppointmentsFromApi(date: string | null): Observable<GroupedAppointmentDTO[]> {
    if (date) {
      const params = new HttpParams().set('date', date.toString());

      return this._http
        .get<GroupedAppointmentDTO[]>(
          '/api/Appointment/GetListAppointmentsPatientsByDate',
          { params }
        )
        .pipe(
          tap((appointments: GroupedAppointmentDTO[]) => {
            this.appointments.next(appointments);
            localStorage.setItem('appointments', JSON.stringify(appointments));
          })
        );
    }
    return this._http
      .get<GroupedAppointmentDTO[]>(
        '/api/Appointment/GetListAppointmentsPatients'
      )
      .pipe(
        tap((appointments: GroupedAppointmentDTO[]) => {
          console.log('asdadadasds')
          this.appointments.next(appointments);
          localStorage.setItem('appointments', JSON.stringify(appointments));
        })
      );
  }

  deleteAppointment(id: number): Observable<GroupedAppointmentDTO[]> {
    const params = new HttpParams().set('idAppointment', id);
    return this._http.delete<GroupedAppointmentDTO[]>(
      '/api/Appointment/DeleteAppointment',
      { params }
    );
  }

  updateAppointment(id: number, appointmentData: UpdateAppointmentModel): Observable<GroupedAppointmentDTO[]> {
    const appointment = {
      idAppointment: id,
      newAppointment: appointmentData,
    } as UpdateAppointmentModelFull;
    return this._http.put<GroupedAppointmentDTO[]>(
      '/api/Appointment/UpdateAppointment',
      {
        ...appointment,
      }
    );
  }
}
