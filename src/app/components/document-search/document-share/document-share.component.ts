import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild,} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {DocShareService} from "../../../services/doc-share/doc-share.service";
import {ShareDocumentEmail} from "../../../models/ShareDocumentEmail.dto";
import {ActivatedRoute} from "@angular/router";
import {SESSION_ID, USERNAME} from "../../../utility/constants.utility";
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {ShareDocumentToUser} from "../../../models/ShareDocumentToUser.dto";
import {ShareDocLink} from "../../../models/ShareDocLink.dto";
import {DOCUMENT_SHARED, LINK_GENERATED} from "../../../utility/message-alerts.utility";
import {PnotifyService} from "../../../services/pnotify/pnotify.service";


@Component({
  selector: 'app-document-share',
  templateUrl: './document-share.component.html',
  styleUrls: ['./document-share.component.css']
})
export class DocumentShareComponent implements OnInit ,OnChanges{
  @Input() isActive: boolean = false;
  @Input() templateName: string = ''
  @Input() id:number
  @Input() isViewSelectedOrViewAll:boolean=false
  documentShareAccordion = "<i class='fa fa-share'></i>  Share";
  title: any;
  emailSharingForm: FormGroup;
  documentShareForm: FormGroup;
  smsSharingForm: FormGroup;
  getDocumentLinkForm: FormGroup;
  users: any[] = [];
  showEmailForm: boolean = true
  showSharingForm: boolean = false
  showGetLinkForm: boolean = false
  showSMSForm:boolean=false
  dtoEmail: ShareDocumentEmail
  dtoUser: ShareDocumentToUser
  dtoLink: ShareDocLink
  selectedButton: HTMLElement | null = null;
  showTelephoneNumber: boolean = true;
  linkReceived: boolean = false;
  linkReceivedValue: string = ''
  messageBody: string;
  constructor(private formBuilder: FormBuilder, private docShareService: DocShareService,
              private route: ActivatedRoute, private docSearchService: DocSearchService, private pnotifyService: PnotifyService) {
  }

  @ViewChild('email', {static: true}) emailTab: ElementRef;
  @ViewChild('sms', {static: true}) smsTab: ElementRef;

  ngOnInit(): void {
    this.selectedButton=this.emailTab.nativeElement
    this.emailSharingForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      messageBody: ['', Validators.required],
      sendAsAttachment: false,
    })
    this.smsSharingForm = this.formBuilder.group({
      smsTelNo: ['', [Validators.required]],
      SMSmessageBody: ['', Validators.required],

    })
    this.documentShareForm = this.formBuilder.group({
      selectAUser: ['', Validators.required]
    })
    this.getDocumentLinkForm = this.formBuilder.group({
      shareWithOTP: [false],
      withoutOTP: [false],
      validPeriod: ['', Validators.required],
      phoneNumber: [''],
      linkReceived: ['']
    }, {validators: requireAtLeastOneSelected});

    //listen to val changes in withoutOTP
    this.getDocumentLinkForm.get('withoutOTP').valueChanges.subscribe(value => {
      this.showTelephoneNumber = !value;
    });

    //listen to val changes in withOTP
    this.getDocumentLinkForm.get('shareWithOTP').valueChanges.subscribe(value => {
      if (value) {
        this.getDocumentLinkForm.get('withoutOTP').setValue(false);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'id':
            this.id = changes.id.currentValue;
            break;
          case 'isViewSelectedOrViewAll':
            this.isViewSelectedOrViewAll = changes.isViewSelectedOrViewAll.currentValue;
            break;
          // Add more cases for other properties if needed
        }
      }
    }
    if(!this.isViewSelectedOrViewAll){
      if (!isNaN(this.id)) {
        this.docSearchService.getDocument(this.id, SearchOperation.SHARE_GETUSERS).subscribe({
          next: (data) => {
            this.users =  data.data.map((item, index) => {
              return {
                dataNumber: index,
                predefinedData: item
              };
            });
          },
          error: (e) => console.log(e),
          complete: () => {
          }
        })
      }
    }
  }

  onEmailSharingFormSubmit() {
    this.dtoEmail = {
      docId: this.id,
      shareToEmail: this.emailSharingForm.value['emailAddress'].toString().split(/\s+/),
      username: localStorage.getItem(USERNAME),
      asAttachment: this.emailSharingForm.value['sendAsAttachment'],
      sessionId: localStorage.getItem(SESSION_ID),
      message: this.emailSharingForm.value['messageBody'],
      templateName: this.templateName
    }

    this.docShareService.shareDocumentByEmail(this.dtoEmail).subscribe({
      next: () => {
        this.pnotifyService.success({
          message: DOCUMENT_SHARED,
          hasConfirm: true,
          confirmMessage: 'Done'
        })
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  onDocumentShareFormSubmit() {
    this.dtoUser = {
      docId: this.id,
      shareToUser: this.documentShareForm.get('selectAUser').value,
      username: localStorage.getItem(USERNAME),
      sessionId: localStorage.getItem(SESSION_ID),
      templateName: this.templateName
    }
    this.docShareService.shareDocumentToUser(this.dtoUser).subscribe({
      next: () => {
        this.pnotifyService.success({
          message: DOCUMENT_SHARED,
          hasConfirm: true,
          confirmMessage: 'Done'
        })
      },
      error: (e) => {
        console.log(e)
      }
    })
  }


  changeButtonColor(clickedButton: HTMLElement): void {

    if (this.selectedButton) {
      this.selectedButton.style.backgroundColor = '#595f69';
      // Set color to gray for previously selected button
    }

    clickedButton.style.backgroundColor = '#ff7b08'; // Set color to yellow for the clicked button
    this.selectedButton = clickedButton; // Update the selected button reference
  }

  emailButtonClicked() {
    this.showEmailForm = true;
    this.showSharingForm = false;
    this.showGetLinkForm = false;
    this.showSMSForm=false;
  }

  sharingButtonClicked() {
    this.showEmailForm = false;
    this.showSharingForm = true;
    this.showGetLinkForm = false;
    this.showSMSForm=false;
  }
  smsButtonClicked() {
    this.showEmailForm = false;
    this.showSharingForm = false;
    this.showGetLinkForm = false;
    this.showSMSForm=true;
  }
  getLinkButtonClicked() {
    this.showEmailForm = false;
    this.showSharingForm = false;
    this.showGetLinkForm = true;
    this.showSMSForm=false;
  }
  onGettingLinkFormSubmit() {
    this.dtoLink = {
      username: localStorage.getItem(USERNAME),
      docId: this.id,
      withOtp: this.getDocumentLinkForm.value['shareWithOTP'] == 'true',
      validTimeInMinute: this.getDocumentLinkForm.value['validPeriod'],
      mobile: this.getDocumentLinkForm.value['phoneNumber'],
      sessionId: localStorage.getItem(SESSION_ID),
      templateName: this.templateName
    }

    this.docShareService.shareDocumentByLink(this.dtoLink).subscribe({
      next: (data) => {
        this.pnotifyService.success({
          message: LINK_GENERATED,
          hasConfirm: true,
          confirmMessage: 'Done'
        });
        this.linkReceived = true;
        this.linkReceivedValue = data.data;


      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {

      }
    })
  }




  sendLinkThroughEmailButtonClicked() {
    this.messageBody = this.linkReceivedValue;
    this.emailButtonClicked();
    this.changeButtonColor(this.emailTab.nativeElement)
  }

  sendLinkThroughSMSButtonClicked() {
    this.messageBody = this.linkReceivedValue;
    this. smsButtonClicked();
    this.changeButtonColor(this.smsTab.nativeElement)
  }

  copyShareLInk() {
    navigator.clipboard.writeText(this.linkReceivedValue)
  }



  onSMSSharingFormSubmit() {

  }
}

// Custom Validator Function
function requireAtLeastOneSelected(control: AbstractControl): ValidationErrors | null {
  const shareWithOTP = control.get('shareWithOTP');
  const withoutOTP = control.get('withoutOTP');

  if (!(shareWithOTP && shareWithOTP.value) && !(withoutOTP && withoutOTP.value)) {
    return {requireAtLeastOneSelected: true};
  }

  return null;
}
