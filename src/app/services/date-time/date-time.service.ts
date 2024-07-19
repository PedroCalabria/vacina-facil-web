import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public availableHours: string[] = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  formattedDate(date: string): string {
    return moment(date).locale('pt-br').format('YYYY-MM-DD');
  }

  validateBirthDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = control.value;
      const currentDate = new Date();

      if (
        !birthDate ||
        isNaN(Date.parse(birthDate)) ||
        new Date(birthDate).getDate() >= (currentDate.getDate() -1)
      ) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  validateAppointmentDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const appointmentDate = control.value;
      const currentDate = new Date();

      if (
        !appointmentDate ||
        isNaN(Date.parse(appointmentDate)) ||
        new Date(appointmentDate).getDate() < currentDate.getDate()
      ) {
        return { invalidDate: true };
      }

      return null;
    };
  }
}
