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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateAppointmentComponent } from '../../components/update-appointment/update-appointment.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

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
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements AfterViewInit {
  private appointmentService = inject(AppointmentService);
  private dateService = inject(DateTimeService);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private router = inject(Router);
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
    this.authService.checkIsTokenExpiring();
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
    this.dateValue = null;
    this.isDisabled.next(true);
    this.appointmentService.getAppointmentsFromApi(null).subscribe();
  }

  handleDeleteAppointment(id: number) {
    this.authService.checkIsTokenExpiring();
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.appointmentService.getAppointmentsFromApi(null).subscribe(() => {
      });
    });
  }

  handleUpdateAppointment(
    id: number,
    appointmentDate: string,
    appointmentTime: string,
    scheduled: number
  ) {
    this.dialog.open(UpdateAppointmentComponent, {
      width: '600px',
      height: 'full',
      data: { id, appointmentDate, appointmentTime, scheduled },
    });
  }
}
