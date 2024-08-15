import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-item',
  template: `<ng-content *ngIf="isActive"></ng-content>`,
})
export class TabItemComponent {

  @Input() title: string;
  isActive = false;

}
