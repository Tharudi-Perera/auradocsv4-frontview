import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";
import {FolderTreeService} from "../../../services/folder-tree/folder-tree.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserService} from "../../../services/user/user.service";
import {PnotifyService} from "../../../services/pnotify/pnotify.service";
import {DOCUMENT_INDEX, FILE_MOVED, FILE_MOVED_FAILED} from "../../../utility/message-alerts.utility";

@Component({
  selector: 'app-forword-to-user-form',
  templateUrl: './forword-to-user-form.component.html',
  styleUrls: ['./forword-to-user-form.component.css']
})
export class ForwordToUserFormComponent implements OnInit {
  forwardToUserForm: FormGroup;
  users: any[] = [];
  folderNamesList:string[]=[];
  selectedFolderNameList:string[]=[];
  constructor(private formBuilder: FormBuilder,
              private modalService:ModalService,
              private folderTreeService:FolderTreeService,
              private userService:UserService,
              private pnotifyService: PnotifyService,
              ) {

  }

  ngOnInit(): void {
    this.forwardToUserForm = this.formBuilder.group({
      selectedCheckBox: [''],
      user:['',[Validators.required]]
    });
    this.folderTreeService.getFolderTree().subscribe({
      next:(data:any)=>{
        data.data.forEach((json)=>{
          if(json.parent==="In_Folder"){
              this.folderNamesList.push(json.text);
          }
        })
      },
      error:err => {
        console.log(err)
      }
    })
    this.userService.getAllUsers().subscribe({
      next:(data)=>{
        data.data.forEach((json)=>{
          this.users.push({
            dataNumber:json.id,
            predefinedData:json.username
          })
        })
      }
    })
  }
  onSubmit() {
    this.folderTreeService.forwardToUser(
      this.forwardToUserForm.controls['user'].value,
     this.selectedFolderNameList
    ).subscribe({
      next:()=>{
        this.pnotifyService.success({
          message: 'The files you have selected were moved successfully.',
          title: FILE_MOVED,
          hasConfirm: false
        })
      },
      error:error=>{
        this.pnotifyService.error({
          message: error.message,
          title: FILE_MOVED_FAILED,
          hasConfirm: false
        })
      }
    })
  }

  closeForm() {
    this.modalService.emitChange(false,'forward-to-user-modal')
  }


  onCheckboxChange(event: any, folderName: string) {
    if (event.target.checked) {
      // Checkbox is checked, add folderName to selectedFolderNameList
      if (!this.selectedFolderNameList.includes(folderName)) {
        this.selectedFolderNameList.push(folderName);
      }
    } else {
      // Checkbox is unchecked, remove folderName from selectedFolderNameList
      const index = this.selectedFolderNameList.indexOf(folderName);
      if (index !== -1) {
        this.selectedFolderNameList.splice(index, 1);
      }
    }
  }
}
