import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-document-file-metadata',
  templateUrl: './document-file-metadata.component.html',
  styleUrls: ['./document-file-metadata.component.css']
})
export class DocumentFileMetadataComponent implements OnInit, OnChanges {
  @Input() isActive: boolean = false;
  @Input() id: number
  @Input() isViewSelectedOrViewAll: boolean = false
  documentFileMetadataAccordion = "<i class='fa fa-info-circle'></i>  File Metadata";
  metaData: any = {};
  isDocumentFileMetadataModalVisible = false;

  constructor(private modalService: ModalService, private docSearchService: DocSearchService) {
  }

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
    if (!this.isViewSelectedOrViewAll) {
      if (this.id != null || this.id != undefined) {
        this.docSearchService.getDocument(this.id, SearchOperation.FILEMETADATA).subscribe({
          next: (data) => {
            this.metaData.fileName = data.data.name;
            this.metaData.indexedDate = data.data.indexedDate;
            this.metaData.indexedBy = data.data.indexedBy;
            this.metaData.lastModifiedDate = data.data.modifiedDate;
            this.metaData.lastModifiedBy = data.data.modifiedBy;
          },
          error: (error) => console.log(error)
        });

      }
    }
  }

  moreMetadataButtonClicked() {
    this.isDocumentFileMetadataModalVisible = !this.isDocumentFileMetadataModalVisible;
    this.modalService.emitChangeWithDocId(this.isDocumentFileMetadataModalVisible, 'document-file-metadata',this.id,this.isViewSelectedOrViewAll)
  }
}
