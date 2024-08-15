import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-add-signature',
  templateUrl: './document-add-signature.component.html',
  styleUrls: ['./document-add-signature.component.css']
})
export class DocumentAddSignatureComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentAddSignatureAccordion="<i class='fa fa-pencil'></i>  Add Signature";
  constructor() { }
  signByHand:boolean=true;
  assignSignature:boolean;
  autoSignature:boolean;
  digitalSignature:boolean;
  selectedButton: HTMLElement | null = null;
  ngOnInit(): void {

  }

  changeButtonColor(clickedButton: HTMLElement): void {

    if (this.selectedButton) {
      this.selectedButton.style.backgroundColor = '#595f69';
      // Set color to gray for previously selected button
    }

    clickedButton.style.backgroundColor = '#ff7b08'; // Set color to yellow for the clicked button
    this.selectedButton = clickedButton; // Update the selected button reference
  }
  byHandButtonClicked() {
    this.signByHand=true;
    this.assignSignature=false;
    this.autoSignature=false;
    this.digitalSignature=false;
  }

  assignButtonClicked() {
    this.signByHand=false;
    this.assignSignature=true;
    this.autoSignature=false;
    this.digitalSignature=false;
  }

  autoButtonClicked() {
    this.signByHand=false;
    this.assignSignature=false;
    this.autoSignature=true;
    this.digitalSignature=false;
  }

  digitalButtonClicked() {
    this.signByHand=false;
    this.assignSignature=false;
    this.autoSignature=false;
    this.digitalSignature=true;
  }

  activeDrawer() {

  }
}
