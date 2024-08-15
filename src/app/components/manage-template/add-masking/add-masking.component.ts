import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-add-masking',
  templateUrl: './add-masking.component.html',
  styleUrls: ['./add-masking.component.css']
})
export class AddMaskingComponent implements OnInit {
  @Input() isActive: boolean = true;
  title: string = "User Account"
  headings: string[];
  tableData=[{}];
  options=[10,25,50,100];
  @Input() isNewMaskingFormVisible = false;
  isDeleteMaskingModalVisible=false;
  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
    this.headings = [
      'Name Of Template',
      'Name of Masking Area',
      'Remove Template'
    ]
    this.tableData = [{
      nameOfTemplate:'Personal_Id',
      nameOfMaskingArea:'image'
    }]

  }
  toggleNewMasking() {
    this.isNewMaskingFormVisible =true;
  }
  deleteTemplate() {
    this.isDeleteMaskingModalVisible = !this.isDeleteMaskingModalVisible;
    this.modalService.emitChange(this.isDeleteMaskingModalVisible,'delete-masking-modal')
  }


  closeNewMaskingForm(value: boolean) {
      this.isNewMaskingFormVisible=value;
  }
}
