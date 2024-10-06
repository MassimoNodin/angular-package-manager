import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class IndexComponent implements OnInit {
  driverAmount!: any;
  packageAmount!: any;
  
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getDriverPackages().subscribe({
      next: (data) => {
        if (data && typeof data === 'object' && 'drivers' in data && 'packages' in data) {
          this.driverAmount = data.drivers;
          this.packageAmount = data.packages;
        } else {
          this.driverAmount = 0;
          this.packageAmount = 0;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.driverAmount = 0;
        this.packageAmount = 0;
      }
    });
  }
}