import { Injectable } from '@angular/core';
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
}
