import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-security-group',
  templateUrl: './security-group.component.html',
  styleUrls: ['./security-group.component.css']
})
export class SecurityGroupComponent implements OnInit {
  @Input() isActive: boolean = true;
  title: string = "Security Group"
  headings: string[];
  tableData: any[];
  options=[10,25,50,100];
  isNewGroupModalVisible = false;
  isDeactivateGroupModalVisible = false;
  editGroup:boolean=false


  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
    this.headings = [
      'Group Name',
      'Description',
      ''
    ]
    this.tableData = [{
      groupName:'3plGroup',
      description:''
    }]

  }
  toggleNewGroup() {
   this.editButtonClicked();
  }


  editButtonClicked() {
    this.editGroup=true
  }



  cancelEditSecurityForm(value: boolean) {
    this.editGroup=value
  }

  deactivateGroup() {
    this.isDeactivateGroupModalVisible = !this.isDeactivateGroupModalVisible;
    this.modalService.emitChange(this.isDeactivateGroupModalVisible,'deactivate-security-group-modal')
  }
}
