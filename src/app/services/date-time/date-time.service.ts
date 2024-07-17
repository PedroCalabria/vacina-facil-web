import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  formattedDate(date: string): string {
    return moment(date).locale('pt-br').format('YYYY-MM-DD');
  }
}
