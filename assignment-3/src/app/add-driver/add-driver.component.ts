import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  driverInformation = {
    driver_name: '',
    driver_department: '',
    driver_licence: '',
    driver_isActive: false
  };

  addDriver() {
    this.databaseService.addDriver(this.driverInformation).subscribe((response: any) => {
      console.log(response)
      if (!response.error) {
        this.router.navigate(['/']);
        return;
      }
      else {
        this.router.navigate(['/invalid']);
      }
    });
  }
}
