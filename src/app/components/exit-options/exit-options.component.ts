import { Component } from '@angular/core';
import { ButtonLogoutComponent } from "../button-logout/button-logout.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DeletePatientComponent } from "../delete-patient/delete-patient.component";


@Component({
  selector: 'app-exit-options',
  standalone: true,
  imports: [ButtonLogoutComponent, MatButtonModule, MatMenuModule, MatIconModule, DeletePatientComponent],
  templateUrl: './exit-options.component.html',
  styleUrl: './exit-options.component.scss'
})
export class ExitOptionsComponent {
}
