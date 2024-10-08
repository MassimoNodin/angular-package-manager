import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-driver.component.html',
  styleUrl: './list-driver.component.css'
})
export class ListDriverComponent {
  drivers: any = [];
  loading = true;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.loading = false;
      console.log(data)
    });
  }

  deleteDriver(id: any) {
    this.databaseService.deleteDriver(id).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
