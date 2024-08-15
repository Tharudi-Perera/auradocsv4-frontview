import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PendingDocsComponent} from "../../components/folder-trees/pending-docs/pending-docs.component";
import {FileUploadFormComponent} from "../../components/forms/file-upload-form/file-upload-form.component";
import {NoOfPendingDocsService} from "../../services/noOfPendingDocs/no-of-pending-docs.service";


@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css']
})
export class UploadDocsComponent implements OnInit {

  title = "Document Capture";
  toggle = true;
  tabs:string="local"
  newFolder:any
  @ViewChild(PendingDocsComponent) pendingDocs;
  @ViewChild(FileUploadFormComponent) fileUploadFormComponent;
  constructor(private noOfPendingDocsService:NoOfPendingDocsService) { }
  ngOnInit(): void {
    this.newFolder=this.noOfPendingDocsService.getNextFolder
  }

  updateTreeAgain(event:boolean) {
    if (event==true){
      this.pendingDocs. refreshTree();
    }
  }

  switchToTab(tab:string) {
    this.tabs=tab;
    this.toggle = !this.toggle;
  }
}
