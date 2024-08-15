import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  OnDestroy, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {StickyNoteDto} from "../../components/document-search/document-datails-group-icons/add-note/StickyNoteDto";
import {Subject} from "rxjs";
import {
  StickynoteComponent
} from "../../components/document-search/document-datails-group-icons/stickynote/stickynote.component";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Element} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class StickynoteService implements OnDestroy{
  private noteSubject = new Subject<StickyNoteDto>();


  constructor(private componentFactory: ComponentFactoryResolver) {
  }

  public open(noteTemplateRef: () => ViewContainerRef): void {
    this.noteSubject.asObservable().subscribe(helpTextData => {
      const stickyNoteComponent = this.createNoteComponent(noteTemplateRef);
      stickyNoteComponent.instance.openNote(helpTextData);
    });
  }

  public initOpenNote(title:string, content: string, event:MouseEvent): void {
    this.noteSubject.next({
      title:title,
      content: content,
      coordinates: event
    });
  }

  private createNoteComponent(stickyNotesRef: () => ViewContainerRef): ComponentRef<StickynoteComponent> {
    const factory = this.componentFactory.resolveComponentFactory(StickynoteComponent);
    return stickyNotesRef().createComponent(factory);
  }

  ngOnDestroy(): void {
    this.noteSubject.unsubscribe();
  }

}
