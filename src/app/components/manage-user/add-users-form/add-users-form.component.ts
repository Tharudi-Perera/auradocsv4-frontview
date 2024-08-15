import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";


@Component({
  selector: 'app-add-users-form',
  templateUrl: './add-users-form.component.html',
  styleUrls: ['./add-users-form.component.css']
})
export class AddUsersFormComponent implements OnInit {
  docAddUserForm : FormGroup;
  templates: any;
  firstAccordionData:any[];
  secondAccordionData: any[];
  secondAccordionTitle:string='Department Security';
  firstAccordionTitle: string='Security Group ';
  collapsedValFirstAccordion: boolean=true;
  collapsedValSecondAccordion: boolean=true;
  constructor( private formBuilder: FormBuilder,private  modalService:ModalService) { }

  ngOnInit(): void {
    this.docAddUserForm = this.formBuilder.group({
      emailAddress:'',
      fullName:'',
      userId:'',
      mobileNo:'',
      password:'',
      rePassword:'',
      template:''
    })


    this.templates = [
      {
        dataNumber: 1,
        predefinedData: 'Active (Status)'
      },
      {
        dataNumber: 2,
        predefinedData: 'In Active (Status)'
      },
    ]
    this.firstAccordionData=['Testing','Admin Group', 'Common','Common Group','Developers','for litro'];
    this.secondAccordionData=['Finance','Supply Chain','HR','Sales Distribution']
    this.firstAccordionData.forEach((val:any)=>{
      this.docAddUserForm.addControl(val,this.formBuilder.control(''))
    })
    this.secondAccordionData.forEach((val:any)=>{
      this.docAddUserForm.addControl(val,this.formBuilder.control(''))
    })


  }

  onSubmit() {

  }

  closeModal() {
    this.modalService.emitChange(false,'add-user-modal')
  }
  collapseValueFirstAccordion(val:boolean) {
    this.collapsedValFirstAccordion=val
  }
  collapseValueSecondAccordion(val:boolean) {
    this.collapsedValSecondAccordion=val
  }


}
