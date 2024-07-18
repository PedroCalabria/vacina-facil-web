export type Appointment = {
  idPatient: number;
  appointmentDate: string;
  appointmentTime: string;
  scheduled: 1 | 2 | 3;
};

export type AppointmentDTO = {
  id: number;
  name: string;
  birthDate: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  scheduled: 1 | 2 | 3;
  creationDate: string;
};

export type GroupedAppointmentDTO = {
  appointmentDate: string;
  appointmentTime: string;
  appointments: AppointmentDTO[];
  count: number;
};

export type UpdateAppointmentModel = {
  appointmentDate: string;
  appointmentTime: string;
  scheduled: number;
};

export type UpdateAppointmentModelFull = {
  idAppointment: number;
  newAppointment: UpdateAppointmentModel;
};
