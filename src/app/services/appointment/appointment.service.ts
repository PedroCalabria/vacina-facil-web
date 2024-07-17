import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Appointment, GroupedAppointmentDTO } from '../../type/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private _http = inject(HttpClient);

  private appointments: GroupedAppointmentDTO[] = [
    {
      appointmentDate: '2024-07-24T00:00:00',
      appointmentTime: '11:00:00',
      appointments: [
        {
          id: 2,
          name: 'Pedro',
          birthDate: '2001-09-03T00:00:00',
          email: 'pedro@email',
          appointmentDate: '2024-07-24T00:00:00',
          appointmentTime: '11:00:00',
          scheduled: 1,
          creationDate: '2024-07-16T20:22:14.433',
        },
      ],
      count: 1,
    },
    {
      appointmentDate: '2024-07-25T00:00:00',
      appointmentTime: '12:00:00',
      appointments: [
        {
          id: 3,
          name: 'Pedro',
          birthDate: '2001-09-03T00:00:00',
          email: 'pedro@email',
          appointmentDate: '2024-07-25T00:00:00',
          appointmentTime: '12:00:00',
          scheduled: 1,
          creationDate: '2024-07-16T22:18:47.27',
        },
      ],
      count: 1,
    },
    {
      appointmentDate: '2024-07-26T00:00:00',
      appointmentTime: '11:00:00',
      appointments: [
        {
          id: 4,
          name: 'Pedro',
          birthDate: '2001-09-03T00:00:00',
          email: 'pedro@email',
          appointmentDate: '2024-07-26T00:00:00',
          appointmentTime: '11:00:00',
          scheduled: 1,
          creationDate: '2024-07-16T22:19:29.783',
        },
      ],
      count: 1,
    },
    {
      appointmentDate: '2024-07-27T00:00:00',
      appointmentTime: '12:00:00',
      appointments: [
        {
          id: 1,
          name: 'Pedro',
          birthDate: '2001-09-03T00:00:00',
          email: 'pedro@email',
          appointmentDate: '2024-07-27T00:00:00',
          appointmentTime: '12:00:00',
          scheduled: 1,
          creationDate: '2024-07-16T18:52:28.247',
        },
      ],
      count: 1,
    },
  ];

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

  getAppointments() {
    return this.appointments;
  }
}
