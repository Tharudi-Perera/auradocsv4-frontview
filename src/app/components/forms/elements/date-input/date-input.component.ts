import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() indexFieldType: string;
  @Input() class: string;
  @Input() placeholder: string='';
  @Input() dateInputWidth: any;
  @ViewChild('inputField') inputField: ElementRef|undefined

  constructor() {
  }


  ngOnInit(): void {
  }

  changeType() {
    this.inputField.nativeElement.type = 'date'
  }
}
