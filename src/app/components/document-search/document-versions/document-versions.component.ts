import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-versions',
  templateUrl: './document-versions.component.html',
  styleUrls: ['./document-versions.component.css']
})
export class DocumentVersionsComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentVersionAccordion="<i class='fa fa-refresh'></i>  Versions";
  documentVersionData:any
  title: any;
  constructor() { }
  selectedButton: HTMLElement | null = null;
  ngOnInit(): void {

    this.documentVersionData=[{
      fileName:	"1-268-958-4135",
      version:"Williams",
      updateBy:"Williams",
    }]
  }
  changeButtonColor(clickedButton: HTMLElement): void {
    if (this.selectedButton) {
      this.selectedButton.style.backgroundColor = '#595f69';
      // Set color to gray for previously selected button
    }

    clickedButton.style.backgroundColor = '#ff7b08'; // Set color to yellow for the clicked button
    this.selectedButton = clickedButton; // Update the selected button reference
  }
}
