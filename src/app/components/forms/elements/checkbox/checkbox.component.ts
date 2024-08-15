import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() isRequired: boolean=false;
  @Input() control: FormControl;
  @Input() class:FormControl;
  constructor() { }

  ngOnInit(): void {
  }

}
