import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {paginate} from "./paginteFunction";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges,OnInit{

  @Input() totalPages:number;
  @Input() pageSize: number ;
  @Input() currentPage: number ;
  @Input() totalResults: number ;
  @Input() show:boolean=true;
  @Input() maxPages:number=10;
  pager: any = {};
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
  this.pager = paginate(this.totalResults, this.currentPage, this.pageSize, this.maxPages);
  //console.log(this.pager)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.totalPages || changes.currentPage){
      this.pager = paginate(this.totalResults, this.currentPage, this.pageSize, this.maxPages);
    }
  }

  setPage(pageIndex: number) {
    this.pager = paginate(this.totalResults, pageIndex, this.pageSize, this.maxPages);
    // this.currentIndex = pageIndex;
    this.route.queryParams.subscribe((params: Params) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: pageIndex ,size:this.pageSize},
          queryParamsHandling: 'merge', // to keep existing query parameters
          // queryParamsHandling: 'merge' merges the new and existing query parameters
          // queryParamsHandling: 'preserve' preserves the existing query parameters
        });

    })

  }
}
