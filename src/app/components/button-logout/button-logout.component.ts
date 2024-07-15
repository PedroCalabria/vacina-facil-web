import { Component } from '@angular/core';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.scss'
})
export class ButtonLogoutComponent {
  logout() {
    console.log('logout')
  }
}
