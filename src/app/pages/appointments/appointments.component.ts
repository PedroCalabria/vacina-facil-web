import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppointmentDTO, GroupedAppointmentDTO } from '../../type/appointment';
import { DatePipe } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    LogoComponent,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements AfterViewInit {
  private appointmentService = inject(AppointmentService);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  appointments: GroupedAppointmentDTO[] =
    this.appointmentService.getAppointments();

  displayedColumns: string[] = [
    'name',
    'birthDate',
    'email',
    'appointmentDate',
    'appointmentTime',
    'scheduled',
    'update',
  ];
  dataSource: MatTableDataSource<AppointmentDTO>;

  constructor() {
    this.dataSource = new MatTableDataSource(
      this.flattenAppointments(this.appointments)
    );
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
}
