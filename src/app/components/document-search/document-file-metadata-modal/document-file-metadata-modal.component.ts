import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-document-file-metadata-modal',
  templateUrl: './document-file-metadata-modal.component.html',
  styleUrls: ['./document-file-metadata-modal.component.css']
})
export class DocumentFileMetadataModalComponent implements OnInit ,OnChanges{
  @Input() isOpen: boolean = false;
  @Output() toggleActive = new EventEmitter<boolean>();
  @Input() id: number
  @Input() isViewSelectedOrViewAll: boolean = false
  constructor() { }

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
  }

  toggleView() {

    this.isOpen = !this.isOpen;
    this.toggleActive.emit(this.isOpen)
  }
}
