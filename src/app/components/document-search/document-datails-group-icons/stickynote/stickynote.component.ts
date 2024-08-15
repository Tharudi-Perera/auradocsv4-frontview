import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {StickyNoteDto} from "../add-note/StickyNoteDto";
import {TemplatePortal,ComponentPortal} from "@angular/cdk/portal";
import {ConnectedPosition, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-stickynote',
  templateUrl: './stickynote.component.html',
  styleUrls: ['./stickynote.component.css']
})
export class StickynoteComponent implements OnInit {

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer
  ) { }
  content: SafeHtml;
  @ViewChild('note', { static: true }) myElementRef: ElementRef<HTMLDivElement>;
  ngOnInit(): void {
  }
  private static leftTopPosition(): ConnectedPosition {
    return {
      originX: 'center',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'top'
    } as ConnectedPosition;
  }
  public  openNote(stickyNote: StickyNoteDto): void {

    this.content = this.validateHtmlContent(stickyNote.content);
    const overlayConfig= {
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(stickyNote.coordinates)
        .withPositions([StickynoteComponent.leftTopPosition()])
    };
    this.overlay.create();
    // this.overlay.create();
    this.myElementRef.nativeElement.style.left = stickyNote.coordinates.x + 'px';
    this.myElementRef.nativeElement.style.top = stickyNote.coordinates.y + 'px';
  }
  private validateHtmlContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
