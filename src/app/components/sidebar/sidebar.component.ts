import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef, AfterViewInit,
} from '@angular/core';
import {UploadDocumentService} from "../../services/upload-document/upload-document.service";
import {NoOfPendingDocsService} from "../../services/noOfPendingDocs/no-of-pending-docs.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,AfterViewInit{

  @Input() activeRoute: string = '/home';
  @Input() togglewarningVal: boolean=false ;
  @Input() auraDocsLogoClicked:boolean=false;
  @ViewChild('noOfDocsElement') noOfDocsElement:ElementRef
  selectedListItem: HTMLElement | null = null;
  noOfDocs:any;
  activeElement = '';
  constructor( private documentService: UploadDocumentService,
               private noOfPendingDocsService:NoOfPendingDocsService,private router: Router) {

  }
  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handlePathChange(event.url);
      });
  }
  ngAfterViewInit() {

    this.noOfDocs= this.noOfPendingDocsService.getNoOfDocs;
  }

  handlePathChange(url: string): void {
    if (url.includes('home') || this.auraDocsLogoClicked) {
      this.activeElement = 'dashboard';
    } else if (url.includes('search') || url.includes('upload') || url.includes('index') || url.includes('file-explorer')) {
      this.activeElement = 'documents';
      this.noOfDocsElement.nativeElement.style.display = 'none';
    } else if (url.includes('profile') || url.includes('preference')) {
      this.activeElement = 'user';
    } else if (url.includes('summary') || url.includes('manage-user') || url.includes('manage-template')) {
      this.activeElement = 'admin';
    } else {
      this.activeElement = 'dashboard'; // Default case
    }
    this.auraDocsLogoClicked = false; // Reset auraDocsLogoClicked flag
  }


  changeActiveElement(element: string) {

    this.activeElement = element;

    if( element==='documents'){
      this.noOfDocsElement.nativeElement.style.display='none';

    }else{
      this.noOfDocsElement.nativeElement.style.display=''
    }
  }


  changeListItemColor(clickedListItem: HTMLElement): void {
    if (this.selectedListItem) {
      this.selectedListItem.style.backgroundColor = '';
      // Set color to gray for previously selected button
    }

    clickedListItem.style.backgroundColor = '#c3c4c7'; // Set color to yellow for the clicked button
    this.selectedListItem = clickedListItem; // Update the selected button reference
  }
  decideVisibilityOfnoOfDocs() {
    if(this.togglewarningVal){
      this.noOfDocsElement.nativeElement.style.display='none';
    }
  }
}
