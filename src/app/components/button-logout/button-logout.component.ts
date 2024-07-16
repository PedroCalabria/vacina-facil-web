import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.scss'
})
export class ButtonLogoutComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
