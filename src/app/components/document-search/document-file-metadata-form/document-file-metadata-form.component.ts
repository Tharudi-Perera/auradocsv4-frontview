import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {SearchOperation} from "../../../enum/search-operation.enum";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-document-file-metadata-form',
  templateUrl: './document-file-metadata-form.component.html',
  styleUrls: ['./document-file-metadata-form.component.css']
})
export class DocumentFileMetadataFormComponent implements OnInit ,OnChanges{
  fileMetaData: any[]=[{}];
  constructor(private modalService: ModalService, private docSearchService: DocSearchService, private route: ActivatedRoute) {
  }
  @Input() id:number
  @Input() isViewSelectedOrViewAll:boolean=false
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'id':
            this.id = changes.id.currentValue;
            break;
          case 'isViewSelectedOrViewAll':
            this.isViewSelectedOrViewAll = changes.isViewSelectedOrViewAll.currentValue;
            break;
          // Add more cases for other properties if needed
        }
      }
    }
    if(!this.isViewSelectedOrViewAll){
      if (this.id != null || this.id != undefined) {
        this.docSearchService.getDocument(this.id, SearchOperation.FILEMETADATA_MORE).subscribe({
          next:(data)=>{
            this.fileMetaData[0]=data.data
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    }

  }

  closeModal() {
    this.modalService.emitChange(false, 'document-file-metadata')
  }


}
