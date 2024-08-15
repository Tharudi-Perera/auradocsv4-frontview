import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './auth/app.init';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './components/basic/card/card.component';
import { TileComponent } from './components/basic/tile/tile.component';
import { ModalComponent } from './components/basic/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccordionComponent } from './components/basic/accordion/accordion.component';
import { UploadDocsComponent } from './pages/upload-docs/upload-docs.component';
import { PendingDocsComponent } from './components/folder-trees/pending-docs/pending-docs.component';
import { AlertComponent } from './components/basic/alert/alert.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { IndexDocumentComponent } from './pages/index-document/index-document.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { DocumentSearchModalComponent } from './components/document-search-modal/document-search-modal.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { PnotifyService } from './services/pnotify/pnotify.service';
import { IndexFormComponent } from './components/forms/index-form/index-form.component';
import { FileUploadFormComponent } from './components/forms/file-upload-form/file-upload-form.component';
import { InputComponent } from './components/forms/elements/input/input.component';
import { CheckboxComponent } from './components/forms/elements/checkbox/checkbox.component';
import { SelectComponent } from './components/forms/elements/select/select.component';
import { TextareaComponent } from './components/forms/elements/textarea/textarea.component';
import { DateInputComponent } from './components/forms/elements/date-input/date-input.component';
import { TableComponent } from './components/basic/table/table.component';
import { MultipleFileUploadComponent } from './components/forms/elements/multiple-file-upload/multiple-file-upload.component';
import { FileExplorerComponent } from './pages/file-explorer/file-explorer.component';
import { DocumentCartComponent } from './components/file-explorer/document-cart/document-cart.component';
import { FavouritesComponent } from './components/file-explorer/favourites/favourites.component';
import { FileComponent } from './components/file-explorer/file/file.component';
import { ViewComponent } from './components/file-explorer/view/view.component';
import { InlineTabComponent } from './components/basic/inline-tab/inline-tab.component';
import { TabItemComponent } from './components/basic/inline-tab/tab-item/tab-item.component';
import { FileExplorerTreeComponent } from './components/folder-trees/file-explorer-tree/file-explorer-tree.component';
import { MyDocumentsTreeComponent } from './components/folder-trees/my-documents-tree/my-documents-tree.component';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserProfileFormComponent } from './components/forms/user-profile-form/user-profile-form.component';
import { DocumentSearchComponent } from './pages/document-search/document-search.component';
import {DashboardTablesComponent} from "./components/dashboard-tables/dashboard-tables.component";
import { CarouselComponent } from './components/basic/carousel/carousel.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { AdminPanelButtonsComponent } from './components/admin-panel-buttons/admin-panel-buttons.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DocumentSearchFormComponent } from './components/forms/document-search-form/document-search-form.component';
import { UserAccountComponent } from './components/manage-user/user-account/user-account.component';
import { SecurityGroupComponent } from './components/manage-user/security-group/security-group.component';
import { UserGroupComponent } from './components/manage-user/user-group/user-group.component';
import { AddUsersModalComponent } from './components/manage-user/add-users-modal/add-users-modal.component';
import { AddUsersFormComponent } from './components/manage-user/add-users-form/add-users-form.component';
import { EditSecurityGroupFormComponent } from './components/manage-user/edit-security-group-form/edit-security-group-form.component';
import { DeactivateSecurityGroupFormComponent } from './components/manage-user/deactivate-security-group-form/deactivate-security-group-form.component';
import { DeactivateSecurityGroupModalComponent } from './components/manage-user/deactivate-security-group-modal/deactivate-security-group-modal.component';
import { UserGroupAddUserFormComponent } from './components/manage-user/user-group-add-user-form/user-group-add-user-form.component';
import { EditUserAccountFormComponent } from './components/manage-user/edit-user-account-form/edit-user-account-form.component';
import { EditUserAccountModalComponent } from './components/manage-user/edit-user-account-modal/edit-user-account-modal.component';
import { UserAccountTemplateTableModalComponent } from './components/manage-user/user-account-template-table-modal/user-account-template-table-modal.component';
import { UserAccountTemplateTableFormComponent } from './components/manage-user/user-account-template-table-form/user-account-template-table-form.component';
import { ManageTemplateComponent } from './pages/manage-template/manage-template.component';
import { TemplateCreatorComponent } from './components/manage-template/template-creator/template-creator.component';
import { AddMaskingComponent } from './components/manage-template/add-masking/add-masking.component';
import { NewTemplateModalComponent } from './components/manage-template/new-template-modal/new-template-modal.component';
import { NewTemplateFormComponent } from './components/manage-template/new-template-form/new-template-form.component';
import { EditTemplateModalComponent } from './components/manage-template/edit-template-modal/edit-template-modal.component';
import { EditTemplateFormComponent } from './components/manage-template/edit-template-form/edit-template-form.component';
import { NewMaskingFormComponent } from './components/manage-template/new-masking-form/new-masking-form.component';
import { DeleteMaskingFormComponent } from './components/manage-template/delete-masking-form/delete-masking-form.component';
import { DeleteMaskingModalComponent } from './components/manage-template/delete-masking-modal/delete-masking-modal.component';
import { SearchResultComponent } from './components/document-search/search-result/search-result.component';
import { DocumentSearchViewComponent } from './components/document-search/document-search-view/document-search-view.component';
import { DocumentSearchViewFormComponent } from './components/document-search/document-search-view-form/document-search-view-form.component';
import { DocumentDetailsGroupsComponent } from './components/document-search/document-details-groups/document-details-groups.component';
import { DocumentVersionsComponent } from './components/document-search/document-versions/document-versions.component';
import { DocumentShareComponent } from './components/document-search/document-share/document-share.component';
import { DocumentCommentsComponent } from './components/document-search/document-comments/document-comments.component';
import { DocumentTagsComponent } from './components/document-search/document-tags/document-tags.component';
import { DocumentFileMetadataComponent } from './components/document-search/document-file-metadata/document-file-metadata.component';
import { DocumentFileMetadataFormComponent } from './components/document-search/document-file-metadata-form/document-file-metadata-form.component';
import { DocumentFileMetadataModalComponent } from './components/document-search/document-file-metadata-modal/document-file-metadata-modal.component';
import { DocumentAuditTrailComponent } from './components/document-search/document-audit-trail/document-audit-trail.component';
import { DocumentWorkflowComponent } from './components/document-search/document-workflow/document-workflow.component';
import { DocumentRequestComponent } from './components/document-search/document-request/document-request.component';
import { DocumentBlockchainComponent } from './components/document-search/document-blockchain/document-blockchain.component';
import { DocumentPrivateFolderTreeComponent } from './components/document-search/document-private-folder-tree/document-private-folder-tree.component';
import { DocumentTodoListComponent } from './components/document-search/document-todo-list/document-todo-list.component';
import { DocumentTodoAddTaskModalComponent } from './components/document-search/document-todo-add-task-modal/document-todo-add-task-modal.component';
import { DocumentTodoAddTaskFormComponent } from './components/document-search/document-todo-add-task-form/document-todo-add-task-form.component';
import { DocumentTodoSeeAllTaskFormComponent } from './components/document-search/document-todo-see-all-task-form/document-todo-see-all-task-form.component';
import { DocumentTodoSeeAllTaskModalComponent } from './components/document-search/document-todo-see-all-task-modal/document-todo-see-all-task-modal.component';
import { DocumentAddSignatureComponent } from './components/document-search/document-add-signature/document-add-signature.component';
import { ForwordToUserModalComponent } from './components/file-upload-page-modal/forword-to-user-modal/forword-to-user-modal.component';
import { ForwordToUserFormComponent } from './components/file-upload-page-modal/forword-to-user-form/forword-to-user-form.component';
import { EditDetailsComponent } from './components/document-search/document-datails-group-icons/edit-details/edit-details.component';
import { AddNoteAndSignComponent } from './components/document-search/document-datails-group-icons/add-note-and-sign/add-note-and-sign.component';
import { AddNoteComponent } from './components/document-search/document-datails-group-icons/add-note/add-note.component';
import { StickynoteComponent } from './components/document-search/document-datails-group-icons/stickynote/stickynote.component';

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { AddSignComponent } from './components/document-search/document-datails-group-icons/add-sign/add-sign.component';
import {AngularDraggableModule} from 'angular2-draggable';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    CardComponent,
    TileComponent,
    ModalComponent,
    AccordionComponent,
    UploadDocsComponent,
    PendingDocsComponent,
    AlertComponent,
    IndexDocumentComponent,
    NotFoundComponent,
    ServerErrorComponent,
    DocumentSearchModalComponent,
    PdfViewerComponent,
    IndexFormComponent,
    FileUploadFormComponent,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
    TextareaComponent,
    DateInputComponent,
    TableComponent,
    MultipleFileUploadComponent,
    FileExplorerComponent,
    DocumentCartComponent,
    FavouritesComponent,
    FileComponent,
    ViewComponent,
    InlineTabComponent,
    TabItemComponent,
    FileExplorerTreeComponent,
    MyDocumentsTreeComponent,
    DashboardCardsComponent,
    ProfileComponent,
    UserProfileFormComponent,
    DocumentSearchComponent,
    DashboardTablesComponent,
    CarouselComponent,
    SummaryComponent,
    AdminPanelButtonsComponent,
    ManageUserComponent,
    PaginationComponent,
    DocumentSearchFormComponent,
    UserAccountComponent,
    SecurityGroupComponent,
    UserGroupComponent,
    AddUsersModalComponent,
    AddUsersFormComponent,
    EditSecurityGroupFormComponent,
    DeactivateSecurityGroupFormComponent,
    DeactivateSecurityGroupModalComponent,
    UserGroupAddUserFormComponent,
    EditUserAccountFormComponent,
    EditUserAccountModalComponent,
    UserAccountTemplateTableModalComponent,
    UserAccountTemplateTableFormComponent,
    ManageTemplateComponent,
    TemplateCreatorComponent,
    AddMaskingComponent,
    NewTemplateModalComponent,
    NewTemplateFormComponent,
    EditTemplateModalComponent,
    EditTemplateFormComponent,
    NewMaskingFormComponent,
    DeleteMaskingFormComponent,
    DeleteMaskingModalComponent,
    SearchResultComponent,
    DocumentSearchViewComponent,
    DocumentSearchViewFormComponent,
    DocumentDetailsGroupsComponent,
    DocumentVersionsComponent,
    DocumentShareComponent,
    DocumentCommentsComponent,
    DocumentTagsComponent,
    DocumentFileMetadataComponent,
    DocumentFileMetadataFormComponent,
    DocumentFileMetadataModalComponent,
    DocumentAuditTrailComponent,
    DocumentWorkflowComponent,
    DocumentRequestComponent,
    DocumentBlockchainComponent,
    DocumentPrivateFolderTreeComponent,
    DocumentTodoListComponent,
    DocumentTodoAddTaskModalComponent,
    DocumentTodoAddTaskFormComponent,
    DocumentTodoSeeAllTaskFormComponent,
    DocumentTodoSeeAllTaskModalComponent,
    DocumentAddSignatureComponent,
    ForwordToUserModalComponent,
    ForwordToUserFormComponent,
    EditDetailsComponent,
    AddNoteAndSignComponent,
    AddNoteComponent,
    StickynoteComponent,
    AddSignComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        KeycloakAngularModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        FormsModule,
      DragDropModule,
      OverlayModule,
      PortalModule,
      AngularDraggableModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    PnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
