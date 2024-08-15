import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-document-todo-list',
  templateUrl: './document-todo-list.component.html',
  styleUrls: ['./document-todo-list.component.css']
})
export class DocumentTodoListComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentTodoListAccordion="<i class='fa fa-thumbs-up'></i>  To-do List";
  isAddTaskModalVisible:boolean=false;
  isSeeAllTaskModalVisible:boolean=false;
  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
    let buttons = Array.from(
      document.getElementsByClassName('buttonColor') as HTMLCollectionOf<HTMLElement>,
    );
    // change button color when clicked
    buttons.forEach(button=>{
      button.addEventListener('click',()=>{
        buttons.forEach(otherButton=>{
          if(otherButton !=button){
            otherButton.style.backgroundColor='#595f69'
          }else{
            button.style.backgroundColor='#ff7b08'
          }
        })

      })

    })
  }

  addTasks() {
    this.isAddTaskModalVisible = !this.isAddTaskModalVisible;
    this.modalService.emitChange(this.isAddTaskModalVisible,'todo-list-add-task-modal')
  }

  seeAllTasks() {
    this.isSeeAllTaskModalVisible = !this.isSeeAllTaskModalVisible;
    this.modalService.emitChange(this.isSeeAllTaskModalVisible,'todo-list-see-all-task-modal')
  }
}
