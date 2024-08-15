import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-document-search-modal',
  templateUrl: './document-search-modal.component.html',
  styleUrls: ['./document-search-modal.component.css']
})
export class DocumentSearchModalComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() toggleActive = new EventEmitter<boolean>();
  isSearchClick = false; 
  advancedSearch: any;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.advancedSearch=this.formBuilder.group({
      anyOfTheseWords:[''],
      allOfTheseWords:[''],
      documentIdFrom:[''],
      documentIdTo:[''],
      start:[''],
      end:[''],
      privateDocumentsCheckbox:[false],
      onlyInTrashCheckbox:[false],

    })
  }

  toggleView() {

    this.isOpen = !this.isOpen;
    this.toggleActive.emit(this.isOpen)
  }

  clickSearch() {
    this.isSearchClick = true;
  }

}
