import { Component, inject } from '@angular/core';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { PatientService } from '../../services/patient/patient.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [],
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.scss'
})
export class DeletePatientComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private appointmentService = inject(AppointmentService);
  private patientService = inject(PatientService);
  
  idPatient: number = this.authService.getTokenInfo()['idPatient'];

  handleDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '600px',
      height: 'full',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.checkIsTokenExpiring();
        this.patientService
          .deleteUser(this.idPatient)
          .subscribe();
      }
    });
  }
}
