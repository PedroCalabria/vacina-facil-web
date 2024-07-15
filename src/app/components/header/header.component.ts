import { Component } from '@angular/core';
import { ButtonLogoutComponent } from "../button-logout/button-logout.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonLogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
