import { Component, inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  packages: any = [];
  package_index = 0;
  constructor(private databaseService: DatabaseService) {}

  router = inject(Router);

  packageInformation = {
    package_id: '',
    package_destination: ''
  };

  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
      this.updateInformation();
    });
  }

  updateInformation() {
    this.packageInformation = { package_id: this.packages[this.package_index]._id, package_destination: this.packages[this.package_index].package_destination };
  }

  updatePackage() {
    this.databaseService.updatePackage(this.packageInformation).subscribe((response: any) => {
      if (!response.error) {
        this.router.navigate(['/packages']);
        return;
      }
      else {
        this.router.navigate(['/invalid']);
      }
    });
  }
}
