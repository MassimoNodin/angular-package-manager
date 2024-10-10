import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common'; 
import io from 'socket.io-client';
import { DatabaseService } from '../database.service';
const socket = io();

@Component({
  selector: 'app-translate-description',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './translate-description.component.html',
  styleUrl: './translate-description.component.css'
})
export class TranslateDescriptionComponent {
  packages: any = [];
  target: string = "ar";
  loading = true;

  constructor(@Inject(DOCUMENT) document: Document, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    socket.on("translate", (data: any) => {
      let element = document.getElementById(data.id);
      if (element) element.innerHTML = data.text;
    });
    this.databaseService.getPackages().subscribe((data) => {
      this.packages = data;
      this.loading = false;
    });
  }

  translate(text: string, id: string): void {
    let element = document.getElementById(id);
    if (element) element.innerHTML = "Translating...";
    socket.emit("translate", { target: this.target, text: text,  id: id});
  }
}
