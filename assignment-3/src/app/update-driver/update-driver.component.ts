import { Component, inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  drivers: any = [];
  driver_index = 0;
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  driverInformation = {
    id: '',
    driver_department: '',
    driver_licence: ''
  };

  ngOnInit(): void {
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.updateInformation();
    });
  }

  updateInformation() {
    this.driverInformation = { id: this.drivers[this.driver_index]._id, driver_department: this.drivers[this.driver_index].driver_department, driver_licence: this.drivers[this.driver_index].driver_licence };
  }

  updateDriver() {
    this.databaseService.updateDriver(this.driverInformation).subscribe((response: any) => {
      if (!response.error) {
        this.router.navigate(['/drivers']);
        return;
      }
      else {
        this.router.navigate(['/invalid']);
      }
    });
  }
}
