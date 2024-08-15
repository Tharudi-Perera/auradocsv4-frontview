import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor() { }
  @Input() cardclass: string = 'panel panel-info' || 'panel panel-primary' || 'panel panel-danger' || 'panel panel-orange' || 'panel panel-sky' || 'panel panel-magenta' || 'panel panel-info' || 'panel panel-grape';
  @Input() title = '';
  @Input() titlesmall = '';
  @Input() titleclass: string = 'col-md-12 clearfix';
  @Input() contentclass?: string = 'col-md-12';
  @Input() analysData?: string[]
  @Input() panelHeaderClass:any
  selectedAnalys = this.analysData ? this.analysData[0] : '';


  getAnalysData(data: string) {
    this.selectedAnalys = data;
    // console.log(data);
  }

}
