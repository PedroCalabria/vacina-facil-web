import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 30000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  hideNotification(): void {
    this.snackBar.dismiss();
  }
}
