import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IngresosApp';

  /**
   *
   */
  constructor(private authService: AuthService) {
    authService.initAuthListener();
  }
}


