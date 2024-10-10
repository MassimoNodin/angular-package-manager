import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import io from 'socket.io-client';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
const socket = io();

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAIComponent {
  packages: any = [];
  loading = true;

  constructor(@Inject(DOCUMENT) document: Document, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    socket.on("generateText", (data: any) => {
      let element = document.getElementById(data.id);
      if (element) element.innerHTML = data.text.response.candidates[0].content.parts[0].text;
    });
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
      this.loading = false;
    });
  }

  calculateDistance(destination: string, id: string): void {
    socket.emit("generateText", { text: destination,  id: id});
  }
}
