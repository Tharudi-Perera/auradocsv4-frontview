import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() isRequired: boolean=false;
  @Input() control: FormControl;
  @Input() options: any[];
  @Input() marginBottom: any;
  @Input() marginTop: any;
  @Input() showPredefinedDataAsValue: boolean=false;
  @Input() selectedOption: string;



  constructor() {this.selectedOption='-Select option-'; }

  ngOnInit(): void {

  }



}
