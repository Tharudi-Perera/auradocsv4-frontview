import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-document-comments',
  templateUrl: './document-comments.component.html',
  styleUrls: ['./document-comments.component.css']
})
export class DocumentCommentsComponent implements OnInit {
  commentsForm: FormGroup;
  @Input() isActive: boolean=false;
  documentCommentsAccordion="<i class='fa fa-comment'></i>  Comments";
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.commentsForm=this.formBuilder.group({
      comments:''
    })
  }

  onCommentsFormSubmit() {

  }
}
