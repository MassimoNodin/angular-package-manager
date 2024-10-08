import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  stats: any = {
    insert: 0,
    update: 0,
    delete: 0,
    retrieve: 0
  }
  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    this.databaseService.getStatistics().subscribe(stats => this.stats = stats);
  }
}
