import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() control: FormControl;
  @Input() placeholder: string='';
  @Input() width: string;
  @Input() height: string;
  @Input() isRequired: boolean=false;
  @Input() value:string
  @Input() backgroundColor: string;
  @Input() border: any;
  constructor() { }

  ngOnInit(): void {
  }

}
