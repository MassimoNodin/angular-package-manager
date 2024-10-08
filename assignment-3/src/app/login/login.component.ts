import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  loginInformation = {
    username: '',
    password: ''
  };

  login() {
    firstValueFrom(this.databaseService.login(this.loginInformation.username, this.loginInformation.password))
      .then((response: any) => {
        if (response.status == "Logged in") {
          this.router.navigate(['/']);
          return;
        }
        else {
          this.router.navigate(['/invalid']);
        }
      })
      .catch((error: any) => {
        this.router.navigate(['/invalid']);
      });
  }
}
