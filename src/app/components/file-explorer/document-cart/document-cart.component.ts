import {Component, OnInit, Input, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-document-cart',
  templateUrl: './document-cart.component.html',
  styleUrls: ['./document-cart.component.css']
})
export class DocumentCartComponent {

  @Input() isActive: boolean=true ;
  title: string = "Document Cart"
  documentCart: any[] = [];
  constructor() {
  }


}
