import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
  packages: any = [];
  loading: boolean = true;
  package_id: number = 0;
  router: Router = inject(Router);

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
      this.loading = false;
    });
  }

  deletePackage() {
    this.databaseService.deletePackage(this.package_id).subscribe((response) => {
      this.router.navigate(['/packages']);
    });
  }
}
