import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public availableHours: string[] = [];

  constructor() {
    for (let i = 8; i <= 20; i++) {
      if (i < 10) {
        this.availableHours.push(`0${i}:00`);
      } else {
        this.availableHours.push(`${i}:00`);
      }
    }
  }

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
        new Date(birthDate).getTime() >= currentDate.getTime()
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
        new Date(appointmentDate).getTime() < currentDate.getTime()
      ) {
        console.log('DATE ERROR')
        return { invalidDate: true };
      }

      return null;
    };
  }
}
