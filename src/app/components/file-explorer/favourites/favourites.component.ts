import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  @Input() isActive: boolean = true;
  title: string = "Favourites"
  headings: string[];
  tableData: any[];
  options=[10,25,50,100];



  constructor() { }

  ngOnInit(): void {
    this.headings = [
      'Doc. No',
      'Index Results',
      'View',
      'Cart',
      'Remove'
    ]
    this.tableData = [
    ]
  }

}
