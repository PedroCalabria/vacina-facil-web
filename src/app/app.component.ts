import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AsyncPipe } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, AsyncPipe]
})
export class AppComponent {
  title = 'vacina-facil-web';

  private authService = inject(AuthService);
  isLogged$ = this.authService.isLogged$;
}
