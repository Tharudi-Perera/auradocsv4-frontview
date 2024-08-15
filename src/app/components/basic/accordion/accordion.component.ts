import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  constructor() { }
  @Input() collapsed = false;
  @Input() title = '';
  @Input() panelstyle = 'panel-danger' || 'panel-orange' || 'panel-primary' ;
  @Input() gray: boolean;
  @Input() checkMark:boolean
  @Input() minHeight: string;
  @Input() innerHTML: any;
  @Output() collapsedVal=new EventEmitter<boolean>()
  ngOnInit(): void {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedVal.emit(this.collapsed)
  }
}
