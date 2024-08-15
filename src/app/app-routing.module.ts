import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/keycloak.guard';
import { HomeComponent } from './pages/home/home.component';
import { UploadDocsComponent } from './pages/upload-docs/upload-docs.component';
import { IndexDocumentComponent } from './pages/index-document/index-document.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { FileExplorerComponent } from './pages/file-explorer/file-explorer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DocumentSearchComponent } from './pages/document-search/document-search.component';
import { SummaryComponent } from "./pages/summary/summary.component";
import { ManageUserComponent } from "./pages/manage-user/manage-user.component";
import { ManageTemplateComponent } from "./pages/manage-template/manage-template.component";



const routes: Routes = [
  //, canActivate: [AuthGuard]
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'file-explorer', component: FileExplorerComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexDocumentComponent, canActivate: [AuthGuard] },
  { path: 'internal-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: DocumentSearchComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadDocsComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'manage-user', component: ManageUserComponent, canActivate: [AuthGuard] },
  { path: 'manage-template', component: ManageTemplateComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, UploadDocsComponent, IndexDocumentComponent, NotFoundComponent, ServerErrorComponent]
