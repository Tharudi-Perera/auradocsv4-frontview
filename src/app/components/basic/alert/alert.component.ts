import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }
  @Input() alerttype = 'alert-default';
  ngOnInit(): void {
  }
  closeAlert() {
    this.alerttype = 'alert-default closed';
  }
}
