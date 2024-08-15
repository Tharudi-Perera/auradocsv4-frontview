import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() caption: string = "";
  @Input() headings: any[]=[];
  @Input() data: any[]=[];
  @Input() isTableBoarded?: boolean = false;
  @Input() isStriped?: boolean = false;
  @Input() hoverEnabled?: boolean = false;
  @Input() tableCondensed?: boolean = false;
  @Input() maximumHeight:string;
  @Input() captionClass: any;
  @Input() headerClass: any;
  @Input() marginBottomOfTable: string;
  @Input() accessRequest: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
