import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../../services/modal-service/modal.service";
import {StickynoteService} from "../../../../services/stickynote/stickynote.service";
import {fromEvent} from "rxjs";
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {Element} from "@angular/compiler";
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private modalService:ModalService,
              private stickyNoteService:StickynoteService
  ) { }
  @Input() isVisible: boolean;
  addNoteForm: FormGroup;
  backgroundColor: string='#fdfbbc';

  @ViewChild('submitButton', {static: true}) submitButton: ElementRef;
  @ViewChild('addNoteModal', {static: true}) addNoteModal: ElementRef;


  ngOnInit(): void {
    this.addNoteForm=this.formBuilder.group({
      title:[''],
      content:[''],
    })
  }

  addNoteFormSubmit(event:MouseEvent) {

    // this.openNote()
    // let note:StickyNoteDto={
    //   title:this.addNoteForm.get('title').value,
    //   content: this.addNoteForm.get('content').value,
    //   coordinates: MouseEvent;
    // }
  }


  changeBackgroundColor(color: string) {
    this.backgroundColor=color
  }

  closeModal() {
    this.modalService.emitChange(false,'add-note-form')
  }

  submitButtonClicked(event:MouseEvent) {
    this.stickyNoteService.initOpenNote(
      this.addNoteForm.get('title').value,
      this.addNoteForm.get('content').value,
      event);
    this.modalService.emitChange(false,'add-note-form');
  }


}
