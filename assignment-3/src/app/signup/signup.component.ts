import { Component, inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from 'express';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  loginInformation = {
    username: '',
    password: ''
  };

  signUp() {
    firstValueFrom(this.databaseService.signUp(this.loginInformation.username, this.loginInformation.password))
      .then((response: any) => {
        console.log(response.error);
        if (response.error) {
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
