import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Component({
  selector: 'app-delete-appointment',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './delete-appointment.component.html',
  styleUrl: './delete-appointment.component.scss',
})
export class DeleteAppointmentComponent {
  private authService = inject(AuthService);
  private appointmentService = inject(AppointmentService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
    },
    private dialogRef: MatDialogRef<DeleteAppointmentComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleSubmit(): void {
    this.authService.checkIsTokenExpiring();
    this.appointmentService.deleteAppointment(this.data.id).subscribe(() => {
      this.appointmentService.getAppointmentsFromApi(null).subscribe(() => {});
    });
    this.dialogRef.close();
  }
}
