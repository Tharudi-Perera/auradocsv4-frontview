import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { UploadDocumentService } from 'src/app/services/upload-document/upload-document.service';
import { PnotifyService } from 'src/app/services/pnotify/pnotify.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements AfterViewInit {

  @Input() isActive: boolean = true;
  title: string = "View"
  base64Src: string = '';
  filepath = "In Folder/1001/Type_Specimen_Garet.pdf"

  constructor(
    private documentService: UploadDocumentService,
    private pnotifyService: PnotifyService
  ) { }

  ngAfterViewInit(): void {
    this.documentService.getDocument(this.filepath).subscribe({
      next: data => {
        this.base64Src = data.message;
      },
      error: error => {
        console.log(error)
        this.pnotifyService.error({
          message: error.error.message,
          hasConfirm: false
        })
      }
    })
  }

}
