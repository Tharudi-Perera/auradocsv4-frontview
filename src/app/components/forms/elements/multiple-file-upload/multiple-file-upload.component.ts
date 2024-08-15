import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PnotifyService } from './../../../../services/pnotify/pnotify.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css']
})
export class MultipleFileUploadComponent implements OnInit {

  @Input() removeFiles: () => void;
  @Output() filesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(private pnotifyService: PnotifyService) { }

  ngOnInit(): void { }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const files = inputElement.files;
      let fileList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      this.filesSelected.emit(fileList);
    } else {
      this.pnotifyService.error({
        message: 'Files not selected',
        title: 'Document Uploader',
        hasConfirm: false
      })
    }
  }
}
