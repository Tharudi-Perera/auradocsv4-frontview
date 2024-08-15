import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-security-group-form',
  templateUrl: './edit-security-group-form.component.html',
  styleUrls: ['./edit-security-group-form.component.css']
})
export class EditSecurityGroupFormComponent implements OnInit {
  @Output() cancelEditSecurityForm=new EventEmitter<boolean>();
  editGroupForm: FormGroup

  tableHeadings:any[]
  templateSecurityTableData=[{}]

  firstAccordionData:any[];
  firstAccordionTitle: string='Documents';
  collapsedValFirstAccordion: boolean=true;

  secondAccordionData: any[];
  secondAccordionTitle:string='Document Viewer';
  collapsedValSecondAccordion: boolean=true;

  thirdAccordionData: any[];
  thirdAccordionTitle:string='Administration';
  collapsedValThirdAccordion: boolean=true;

  fourthAccordionData: any[];
  fourthAccordionTitle:string='Administration';
  collapsedValFourthAccordion: boolean=true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editGroupForm = this.formBuilder.group({
      groupName:'',
      description:''
    })

    this.firstAccordionData=['File Explorer','File Explorer Add folder','File Explorer Delete','File Explorer Rename']
    this.secondAccordionData=['Admin Tab','Department Manage','LDAP Credentials','ReIndex']
    this.thirdAccordionData=['Audit Trail','Block Chain','File MetaData']
    this.fourthAccordionData=['Add New Reports','Audit Reports','BlockChain Reports']
    this.tableHeadings=['Name','Masking','View','Index','Edit','Delete','Access Level','Email','Download','Auto Index','Print','OTP']
    this.templateSecurityTableData=[{
      name:'Dole Template',
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
    this.firstAccordionData.forEach((val:any)=>{
      this.editGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.secondAccordionData.forEach((val:any)=>{
      this.editGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.thirdAccordionData.forEach((val:any)=>{
      this.editGroupForm.addControl(val,this.formBuilder.control(''))
    })
    this.fourthAccordionData.forEach((val:any)=>{
      this.editGroupForm.addControl(val,this.formBuilder.control(''))
    })

    this.templateSecurityTableData.forEach((jsonObject:any)=>{
      this.editGroupForm.addControl(jsonObject.name,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.view,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.index,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.edit,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.delete,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.accessLevel,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.email,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.download,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.autoIndex,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.print,this.formBuilder.control(''))
      this.editGroupForm.addControl(jsonObject.otp,this.formBuilder.control(''))
    })
  }

  onSubmit() {

  }

  closeForm() {
    this.cancelEditSecurityForm.emit(false)
  }

  collapseValueFirstAccordion(val:boolean) {
    this.collapsedValFirstAccordion=val
  }
  collapseValueSecondAccordion(val:boolean) {
    this.collapsedValSecondAccordion=val
  }
  collapseValueThirdAccordion(val:boolean) {
    this.collapsedValThirdAccordion=val
  }
  collapseValueFourthAccordion(val:boolean) {
    this.collapsedValFourthAccordion=val
  }
}
