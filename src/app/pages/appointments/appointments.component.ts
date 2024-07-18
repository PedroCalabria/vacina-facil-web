import {
  AfterViewInit,
  Component,
  inject,
  ViewChild,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppointmentDTO, GroupedAppointmentDTO } from '../../type/appointment';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { DateTimeService } from '../../services/date-time/date-time.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatTableModule,
    DatePipe,
    LogoComponent,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements AfterViewInit {
  private appointmentService = inject(AppointmentService);
  private dateService = inject(DateTimeService);
  private location = inject(Location);
  private isDisabled = new BehaviorSubject<boolean>(true);

  appointments$ = this.appointmentService.appointments$;
  isDisabled$ = this.isDisabled.asObservable();
  selectedDate: string = '';
  dateValue: Date | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'birthDate',
    'email',
    'appointmentDate',
    'appointmentTime',
    'scheduled',
    'update',
  ];
  dataSource: MatTableDataSource<AppointmentDTO> =
    new MatTableDataSource<AppointmentDTO>([]);

  constructor() {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const appointments = JSON.parse(
        savedAppointments
      ) as GroupedAppointmentDTO[];
      this.appointmentService.setAppointments(appointments);
    } else {
      this.appointmentService.getAppointmentsFromApi(null).subscribe();
    }
    this.appointments$.subscribe((appointments) => {
      this.dataSource.data = this.flattenAppointments(appointments);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  flattenAppointments(
    groupedAppointments: GroupedAppointmentDTO[]
  ): AppointmentDTO[] {
    return groupedAppointments.reduce<AppointmentDTO[]>((acc, group) => {
      return acc.concat(group.appointments);
    }, []);
  }

  translateScheduledEnum(scheduled: string) {
    switch (scheduled) {
      case '2':
        return 'Realizado';
      case '3':
        return 'Não Realizado';
      default:
        return 'Agendado';
    }
  }

  handleDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = this.dateService.formattedDate(
        event.value.toString()
      );
      this.appointmentService
        .getAppointmentsFromApi(this.selectedDate)
        .subscribe();
      this.isDisabled.next(false);
    } else {
      this.appointmentService.getAppointmentsFromApi(null).subscribe();
      this.isDisabled.next(true);
    }
  }

  handleCancelDate() {
    this.dateValue = null
    this.isDisabled.next(true);
    localStorage.removeItem('appointments');
    this.appointmentService
        .getAppointmentsFromApi(null)
        .subscribe();
  }
}
