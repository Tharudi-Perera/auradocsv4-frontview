import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter, AfterViewInit
} from '@angular/core';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { PnotifyService } from 'src/app/services/pnotify/pnotify.service';
import { RequestFileService } from 'src/app/services/request-file/request-file.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit,OnChanges,AfterViewInit {



  @ViewChild('pdfViewer') pdfViewerRef: ElementRef;

  @Input() filepath: string;
  @Input() base64: string;
  page: number = 10;
  public spreadMode: 'off' | 'even' | 'odd' = 'off';
  pdfLoaded: boolean = true;
  @Output() pdfRendered=new EventEmitter<any>()
  constructor(
    private pdfViewerService: NgxExtendedPdfViewerService,
    private pnotifyService: PnotifyService,
    private requestFile: RequestFileService
  ) {

  }

  ngOnInit(): void { }
  ngAfterViewInit() {


  }

  ngOnChanges(changes: SimpleChanges) {
    this.pdfLoaded = true
    if (changes.base64 && !changes.base64.firstChange) {
      this.base64 = changes.base64.currentValue;
    }
  }

  public onPageRendered(): void {
    if (!this.pdfViewerService.isRenderQueueEmpty()) {
      // try again later when the pages requested by the pdf.js core or the user have been rendered
      setTimeout(() => this.onPageRendered(), 100);
    }

    const pagesBefore = this.spreadMode === 'off' ? 2 : 2;
    const pagesAfter = this.spreadMode === 'off' ? 2 : 5;
    let startPage = Math.max(this.page - pagesBefore, 1);
    let endPage = Math.min(this.page + pagesAfter, this.pdfViewerService.numberOfPages());

    const renderedPages = this.pdfViewerService.currentlyRenderedPages();

    for (let page = startPage; page <= endPage; page++) {
      const pageIndex = page - 1;
      if (!this.pdfViewerService.hasPageBeenRendered(pageIndex)) {
        this.pdfViewerService.addPageToRenderQueue(pageIndex);
        break; // break because you can request only one page at a time
      }
    }
  }

  onPdfLoadFail(e: any) {
    this.pdfLoaded = false
    this.pnotifyService.error({
      message: e.message,
      title: e.name,
      hasConfirm: false
    })
  }

  onPdfLoaded() {
    this.pdfLoaded = true
    this.pdfRendered.emit(this.base64)
  }

}
