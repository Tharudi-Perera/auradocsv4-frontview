import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() type: string = 'text' || 'email' || 'password' || '';
  @Input() isRequired: boolean=false;
  @Input() indexFieldType: string;
  @Input() value: any;
  @Input() placeholder: string;
  @Input() control: FormControl;
  @Input() inputGroupWidth: any;
  @Input() isReadOnly:boolean;
  @Input() textAlign: string;
  @Input() centerPlaceholder:string;
  @Input() isRequiredMessageVisible:boolean=true;
  @Input() height: string;

  constructor() { }

  ngOnInit(): void {

  }

}
