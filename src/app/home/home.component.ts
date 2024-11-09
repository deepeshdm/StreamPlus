import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import { environment } from '../../environments/environment';
import videojs from 'video.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  selectedFile: File | null = null;
  uploadProgress: string = '';
  uploadResult: any;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Upload video directly from the component
  onUpload(): void {
    if (this.selectedFile) {
      this.uploadProgress = 'Uploading...';

      // Prepare the form data for the file upload
      const formData = new FormData();
      formData.append('video', this.selectedFile, this.selectedFile.name);

      // Send the request to the server using Angular's HttpClient
      this.uploadVideo(formData).subscribe(
        (response) => {
          this.uploadResult = response;
          this.uploadProgress = 'Upload successful!';
          this.cdRef.detectChanges(); // Ensures the DOM is updated
          this.initVideoPlayers();
        },
        (error) => {
          console.error('Error uploading video:', error);
          this.uploadProgress = 'Error during upload!';
        }
      );
    } else {
      this.uploadProgress = 'No file selected.';
    }
  }

  // Method to hit the API endpoint for uploading the video
  uploadVideo(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>( environment.nodeapi + '/upload', formData, { headers });
  }

  // Initialize Video.js players after the video list is populated
  initVideoPlayers(): void {

    if (!this.uploadResult || !this.uploadResult.hlsStreams) return;

    this.uploadResult.hlsStreams.forEach((stream: any) => {

      console.log("NODEAPI : ", environment.nodeapi)
      
      // Dynamically add the host name (where HLS segments are stored)
      // stream.hlsUrl = environment.nodeapi + stream.hlsUrl;
      console.log(stream.hlsUrl);

      // Initialize Video.js player for each HLS stream
      const player = videojs(`video-player-${stream.resolution}`);
      player.ready(() => {
        player.play();
      });
    });

  }

  // ngAfterViewInit ensures DOM elements are rendered before video.js is initialized
  ngAfterViewInit(): void {
    this.cdRef.detectChanges(); // Ensure view is updated
    this.initVideoPlayers();
  }

}
