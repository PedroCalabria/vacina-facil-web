import { Component, inject } from '@angular/core';
import { ButtonLogoutComponent } from '../button-logout/button-logout.component';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { AsyncPipe } from '@angular/common';
import { ExitOptionsComponent } from "../exit-options/exit-options.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonLogoutComponent, RouterLink, MatBadgeModule, AsyncPipe, ExitOptionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private appointmentService = inject(AppointmentService);

  totalCount$ = this.appointmentService.numberAppointments$;
}
