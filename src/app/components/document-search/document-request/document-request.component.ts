import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocRequestService} from "../../../services/doc-request/doc-request.service";
import {DOCUMENT_SHARED} from "../../../utility/message-alerts.utility";
import {PnotifyService} from "../../../services/pnotify/pnotify.service";

@Component({
  selector: 'app-document-request',
  templateUrl: './document-request.component.html',
  styleUrls: ['./document-request.component.css']
})
export class DocumentRequestComponent implements OnInit,OnChanges {
  @Input() isActive: boolean=false;
  @Input() id: number;
  documentRequestAccordion="<i class='fa fa-file-o'></i>  Document Request";
  requestForm:FormGroup;
  showSuccessfulRequestSubmitMessage=false;
  requestSend=false
  constructor(private formBuilder:FormBuilder, private docRequestService:DocRequestService,
              ) { }

  ngOnInit(): void {
    this.requestForm=this.formBuilder.group({
      enterRemark:''
    });
    // Simulating a successful request, you can trigger this based on your actual logic
    this.simulateSuccessfulRequest();
  }
  ngOnChanges(changes: SimpleChanges) {
      if (changes.hasOwnProperty('id')) {
        this.id = changes.id.currentValue;
        this.showSuccessfulRequestSubmitMessage=false;
        this.requestSend=false
    }
  }
  simulateSuccessfulRequest() {
    // Automatically hide the message after 60 seconds
    setTimeout(() => {

      this.showSuccessfulRequestSubmitMessage=false;
    }, 60000); // 60000 milliseconds = 60 seconds
  }

  onRequestSubmit() {
    this.docRequestService.postAccessRequest(this.id, this.requestForm.value['enterRemark']).subscribe({
      next: (data) => {
        this.showSuccessfulRequestSubmitMessage=true;
        this.requestSend = true;
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}
