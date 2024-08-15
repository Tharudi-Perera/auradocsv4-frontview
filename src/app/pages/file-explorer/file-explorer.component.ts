import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent  {
  activeElement: string = 'file'
  constructor() { }

  changesActiveAccordion(tabName: string) {
    this.activeElement = tabName;
  }

}
