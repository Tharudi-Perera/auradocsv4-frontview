import { Component, Input, ViewChild } from '@angular/core';




@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  @Input() isActive: boolean = true;
  title: string = "File Explorer"
  toggle = true;
  tabs:string="fileBrowser"
  constructor() { }
  selectTab(tab:string) {
    this.tabs=tab;
    this.toggle = !this.toggle;
  }
}
