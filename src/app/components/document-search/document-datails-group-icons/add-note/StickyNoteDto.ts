import {ElementRef} from "@angular/core";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Element} from "@angular/compiler";

export interface StickyNoteDto {
  title:string,
  content: string;
  coordinates: MouseEvent;
}
