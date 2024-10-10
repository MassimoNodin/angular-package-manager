import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageWeightPipe } from '../package-weight.pipe';

@Component({
  selector: 'app-list-package',
  standalone: true,
  imports: [FormsModule, CommonModule, PackageWeightPipe],
  templateUrl: './list-package.component.html',
  styleUrl: './list-package.component.css'
})
export class ListPackageComponent {
  packages: any = [];
  drivers: any = [];
  loading = true;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
    });
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      for (let i = 0; i < this.packages.length; i++) {
        for (let j = 0; j < this.drivers.length; j++) {
          if (this.packages[i].driver_id === this.drivers[j].driver_id) {
            this.packages[i].driver_obj = this.drivers[j];
          }
        }
      }
      this.loading = false;
    });
  }

  deletePackage(id: any) {
    this.databaseService.deletePackage(id).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
