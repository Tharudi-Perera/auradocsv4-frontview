import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ModalService} from "./services/modal-service/modal.service";
import {NoOfPendingDocsService} from "./services/noOfPendingDocs/no-of-pending-docs.service";
import {StickynoteService} from "./services/stickynote/stickynote.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  currentYear:any
  title = 'auraDOCS-frontend';
  islogin = false;
  klass = '';
  isModalVisible: boolean = false;
  currentRoute: string;
  togglewarningVal:boolean;
  auraDocsLogoStatus:boolean;
  isAddUserModalVisible:boolean;
  isEditUserAccountGroupModalVisible:boolean;
  isDeactivateSecurityGroupModalVisible:boolean;
  isTemplateTableModalVisible:boolean
  isNewTemplateTableModalVisible:boolean
  isEditTemplateTableModalVisible:boolean
  isDeleteMaskingModalVisible:boolean
  isDocumentFileMetadataModalVisible:boolean
  isDocumentSearchTodoListAddTaskModalVisible:boolean;
  isDocumentSearchTodoListSeeAllTaskModalVisible:boolean;
  isForwardToUserModalVisible:boolean;
  isAddNoteSignModalVisible:boolean;
  docId:number;
  isViewSelectedOrViewAll:boolean;
  isAddNoteFormModalVisible:boolean;
  isAddSignFormModalVisible:boolean;

  constructor(private router: Router,
              private modalService:ModalService) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });


  }
  ngOnInit(){
    this.currentYear = new Date().getFullYear();


  }

  ngAfterViewInit() {

    this.modalService.changeEmitted.subscribe({
      next:(val)=> {
        switch (val.modalName) {
          case 'add-user-modal':
            this.isAddUserModalVisible = val.boolVal;
            this.klass = this.isAddUserModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'edit-user-account-group-modal':
            this.isEditUserAccountGroupModalVisible = val.boolVal;
            this.klass = this.isEditUserAccountGroupModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'deactivate-security-group-modal':
            this.isDeactivateSecurityGroupModalVisible = val.boolVal;
            this.klass = this.isDeactivateSecurityGroupModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'user-account-template-table-modal':
            this.isTemplateTableModalVisible = val.boolVal;
            this.klass = this.isTemplateTableModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'new-template-modal':
            this.isNewTemplateTableModalVisible = val.boolVal;
            this.klass = this.isNewTemplateTableModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'edit-template-modal':
            this.isEditTemplateTableModalVisible = val.boolVal;
            this.klass = this.isEditTemplateTableModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'delete-masking-modal':
            this.isDeleteMaskingModalVisible = val.boolVal;
            this.klass = this.isEditTemplateTableModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'document-file-metadata':
            this.isDocumentFileMetadataModalVisible = val.boolVal;
            this.docId=val.id;
            this.isViewSelectedOrViewAll=val.isViewSelectedOrViewAll;
            this.klass = this.isDocumentFileMetadataModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'todo-list-add-task-modal':
            this.isDocumentSearchTodoListAddTaskModalVisible = val.boolVal;
            this.klass = this.isDocumentSearchTodoListAddTaskModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'todo-list-see-all-task-modal':
            this.isDocumentSearchTodoListSeeAllTaskModalVisible = val.boolVal;
            this.klass = this.isDocumentSearchTodoListSeeAllTaskModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'forward-to-user-modal':
            this.isForwardToUserModalVisible = val.boolVal;
            this.klass = this.isForwardToUserModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'Add-Note-Sign':
            this.isAddNoteSignModalVisible = val.boolVal;
            this.klass = this.isAddNoteSignModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')

            if (this.isAddNoteSignModalVisible) {
              // Listen for clicks outside the modal only when it is visible
              setTimeout(() => {
                document.addEventListener('click', this.onClickOutsideModal);
              });
            }
            break;
          case 'add-note-form':
            this.isAddNoteFormModalVisible = val.boolVal;
            this.klass = this.isAddNoteFormModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
          case 'add-sign-form':
            this.isAddSignFormModalVisible = val.boolVal;
            this.klass = this.isAddSignFormModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
            break;
        }



      },
      error:()=>this.isAddUserModalVisible=false
    })
  }

  onClickOutsideModal = (event: MouseEvent) => {
    const modal = document.querySelector('#addNoteAndSignDiv');
    if (modal && !modal.contains(event.target as Node)) {
      // Clicked outside the modal, hide it
      this.modalService.emitChange(false,'Add-Note-Sign')
      document.removeEventListener('click', this.onClickOutsideModal);

    }
  };
  toggleSidebar(value: boolean) {
    this.klass = value ? this.klass + ' collapse-leftbar' : this.klass.replace(' collapse-leftbar', '');
    this.togglewarningVal=value;
  }

  toggleModalVisibility() {
    this.isModalVisible = !this.isModalVisible;
    this.klass = this.isModalVisible ? this.klass + ' modal-open' : this.klass.replace(' modal-open', '')
  }



  GetAuradocsLogoClickedStatus(value: boolean) {
    this.auraDocsLogoStatus=value
    // console.log(this.auraDocsLogoStatus)
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
