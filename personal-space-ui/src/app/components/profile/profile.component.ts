import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  selectedFile: File | null = null;
  errorMsg: string = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.errorMsg = '';
      if (file.type !== 'application/pdf') {
        this.errorMsg = 'Only PDF files are allowed.';
        this.selectedFile = null;
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.errorMsg = 'File size must be less than 2MB.';
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.errorMsg = '';
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log('Uploaded file:', this.selectedFile.name);
      // Add actual upload logic here if needed
    }
  }
}
