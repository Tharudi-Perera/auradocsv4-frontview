import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-blockchain',
  templateUrl: './document-blockchain.component.html',
  styleUrls: ['./document-blockchain.component.css']
})
export class DocumentBlockchainComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentBlockchainAccordion="<i class='fa fa-bitcoin'></i>  Blockchain";
  constructor() { }

  ngOnInit(): void {
  }

}
