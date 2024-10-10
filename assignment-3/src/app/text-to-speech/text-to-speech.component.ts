import { Component } from '@angular/core';
import io from 'socket.io-client';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
const socket = io();

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent {
  drivers: any = [];
  loading = true;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    socket.on("textToSpeech", (data: any) => {
      const audioContext = new (window.AudioContext)();
      audioContext.decodeAudioData(data.audioContent, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        const audioBlob = new Blob([data.audioContent], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = document.createElement('audio');
        audioElement.src = audioUrl;
        audioElement.controls = true;
        let element = document.getElementById(data.id)
        if (element) {
          element.innerHTML = "";
          element.appendChild(audioElement);
        }
      }, (error) => {
        console.error('Error decoding audio data:', error);
      });
    });
    this.databaseService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.loading = false;
    });
  }

  textToSpeech(licence: string, id: string): void {
    let element = document.getElementById(id);
    if (element) element.innerHTML = "Generating Speech...";
    socket.emit("textToSpeech", { licence: licence, id: id });
  }
}
