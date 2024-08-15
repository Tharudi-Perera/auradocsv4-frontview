import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() title: string;
  @Input() cardclass: string;
  @Input() gray: boolean;
  @Input() minHeight: string;
  @Input() headerHeight: string;
  @Input() innerHTML: any;
  @Input() carousalPanelBodyClass: any;


  constructor() { }

  ngOnInit(): void {
  }

}
