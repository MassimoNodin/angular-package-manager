import { Component, inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  drivers: any = [];
  loading = true;
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  packageInformation = {
    package_title: '',
    package_weight: 0,
    package_destination: '',
    package_description: '',
    isAllocated: false,
    driver_id: null
  };

  ngOnInit(): void {
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.loading = false;
    });
  }

  addPackage() {
    this.databaseService.addPackage(this.packageInformation).subscribe((response: any) => {
      if (!response.error) {
        this.router.navigate(['/']);
        return;
      }
      else {
        console.log(response)
        this.router.navigate(['/invalid']);
      }
    });
  }
}
