import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-tags',
  templateUrl: './document-tags.component.html',
  styleUrls: ['./document-tags.component.css']
})
export class DocumentTagsComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentTagsAccordion="<i class='fa fa-tag'></i>  Tags";
  constructor() { }

  ngOnInit(): void {
  }

}
