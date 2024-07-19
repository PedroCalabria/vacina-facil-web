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
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  private authService = inject(AuthService);
  private appointmentService = inject(AppointmentService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
    },
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleSubmit(): void {
    this.dialogRef.close(true);
  }
}
