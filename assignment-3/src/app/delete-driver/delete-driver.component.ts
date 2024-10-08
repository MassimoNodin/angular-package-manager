import { Component, inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  drivers: any = [];
  loading: boolean = true;
  driver_id: number = 0;
  router: Router = inject(Router);

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.loading = false;
    });
  }

  deleteDriver() {
    this.databaseService.deleteDriver(this.driver_id).subscribe((response) => {
      this.router.navigate(['/drivers']);
    });
  }
}
