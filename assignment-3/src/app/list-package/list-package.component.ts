import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-package.component.html',
  styleUrl: './list-package.component.css'
})
export class ListPackageComponent {
  packages: any = [];
  loading = true;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
      this.loading = false;
    });
  }

  deletePackage(id: any) {
    this.databaseService.deletePackage(id).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
