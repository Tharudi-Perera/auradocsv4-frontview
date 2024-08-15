import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  constructor() { }
  @Input() tilestyle: string = 'info-tiles tiles-toyo' || 'info-tiles tiles-success' || 'info-tiles tiles-orange' || 'info-tiles tiles-alizarin';
  @Input() link: string = '';
  @Input() title: string = '';
  @Input() iconclass: string = '';
  @Input() toptext: string = '';
  @Input() text: string = '';
  @Input() smallcapsText: string = '';
  @Input() description: string = '';
  @Input() footer: string = 'More Info';

  ngOnInit(): void {
    this.tilestyle = `info-tiles ${this.tilestyle}`
  }

}
