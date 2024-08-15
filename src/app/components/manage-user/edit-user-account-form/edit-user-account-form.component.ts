import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-edit-user-account-form',
  templateUrl: './edit-user-account-form.component.html',
  styleUrls: ['./edit-user-account-form.component.css']
})
export class EditUserAccountFormComponent implements OnInit, AfterViewInit {
  docNewGroupForm: FormGroup

  documents:any[]
  tableHeadings:any[]
  templateSecurityTableData=[{}]
  registration:boolean=true;
  userRoles:boolean=false;
  templateSecurity:boolean=false;


  firstAccordionDataRegistration:any[];
  secondAccordionDataRegistration: any[];
  firstAccordionTitleRegistration: string='Security Group ';
  secondAccordionTitleRegistration:string='Department Security';

  firstAccordionDataUserRoles:any[];
  secondAccordionDataUserRoles: any[];
  firstAccordionTitleUserRoles: string='Security Group ';
  secondAccordionTitleUserRoles:string='Department Security';

  collapsedValFirstAccordion: boolean=true;
  collapsedValSecondAccordion: boolean=true;
  constructor(private formBuilder: FormBuilder,private  modalService:ModalService) {
  }

  ngOnInit(): void {
    this.docNewGroupForm = this.formBuilder.group({
      status: false,
      fullName: '',
      userId: '',
      emailAddress: '',
      mobileNumber: '',
      changePassword:'',

    })
    this.firstAccordionDataRegistration=['Testing','Admin Group', 'Common','Common Group','Developers','for litro'];
    this.secondAccordionDataRegistration=['Finance','Supply Chain','HR','Sales Distribution']
    this.firstAccordionDataUserRoles=['File Explorer','File Explorer Add folder','File Explorer Delete','File Explorer Rename']
    this.secondAccordionDataUserRoles=['Admin Tab','Department Manage','LDAP Credentials','ReIndex']
    this.tableHeadings=['Name','Masking','View','Index','Edit','Delete','Access Level','Email','Download','Auto Index','Print','OTP']
    this.templateSecurityTableData=[{
      name:'Dole Template',
      setValue:true,
      view:false,
      index:false,
      edit:false,
      delete:false,
      accessLevel:false,
      email:false,
      download:false,
      autoIndex:false,
      print:false,
      otp:false

    }]
    this.firstAccordionDataRegistration.forEach((val:any)=>{
      this.docNewGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.secondAccordionDataRegistration.forEach((val:any)=>{
      this.docNewGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.firstAccordionDataUserRoles.forEach((val:any)=>{
      this.docNewGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.secondAccordionDataUserRoles.forEach((val:any)=>{
      this.docNewGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.templateSecurityTableData.forEach((jsonObject:any)=>{
      this.docNewGroupForm.addControl(jsonObject.name,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.view,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.index,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.edit,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.delete,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.accessLevel,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.email,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.download,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.autoIndex,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.print,this.formBuilder.control(''))
      this.docNewGroupForm.addControl(jsonObject.otp,this.formBuilder.control(''))
    })
  }

  ngAfterViewInit() {
    let buttons = Array.from(
      document.getElementsByClassName('editUserAccountModalButtonColor') as HTMLCollectionOf<HTMLElement>,
    );
    // change button color when clicked
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(otherButton => {
          if (otherButton != button) {
            otherButton.style.backgroundColor = '#595f69'
          } else {
            button.style.backgroundColor = '#ff7b08'
          }
        })

      })

    })
  }

  onSubmit() {

  }
  registrationButtonClicked() {
    this.registration=true;
    this.userRoles=false;
    this.templateSecurity=false;

    this.collapsedValFirstAccordion=true;
    this.collapsedValSecondAccordion=true;
  }
  userRolesButtonClicked() {
    this.registration=false;
    this.userRoles=true;
    this.templateSecurity=false;

    this.collapsedValFirstAccordion=true;
    this.collapsedValSecondAccordion=true;
  }
  templateSecurityButtonClicked(){
    this.registration=false;
    this.userRoles=false;
    this.templateSecurity=true;
  }

  closeModal() {
    this.modalService.emitChange(false,'edit-user-account-group-modal')
  }
  viewTemplateTable(){
    this.modalService.emitChange(true,'user-account-template-table-modal')
  }

  collapseValueFirstAccordion(val:boolean) {
    this.collapsedValFirstAccordion=val
  }
  collapseValueSecondAccordion(val:boolean) {
    this.collapsedValSecondAccordion=val
  }

}
