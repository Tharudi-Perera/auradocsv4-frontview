import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

import {
  NAME,
  USERNAME
} from 'src/app/utility/constants.utility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() togglesidebar = new EventEmitter();
  @Output() toggleModal = new EventEmitter();
  @Output() auraDocsLogo=new EventEmitter<boolean>();
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
    ) { }

  username: string;
  name: string;
  sideBarToggle = false;
  isModalVisible = false;
  notifKlass = 'dropdown';
  klass = 'dropdown';
  messageKlass = 'dropdown';
  languageKlass = 'dropdown';
  searchclass = 'btn-group'
  searchKeyword: string = '';
  @ViewChild('searchInput') searchInput:ElementRef
  notificationsVisible: boolean=true;
  messagesVisibility: boolean=true;

  ngOnInit(): void {

    this.username = localStorage.getItem(USERNAME);
    this.name = localStorage.getItem(NAME);
  }


  toggleProfileView() {
    this.klass = this.klass === 'dropdown' ? 'dropdown open' : 'dropdown';
    this.messageKlass = 'dropdown';
    this.notifKlass = 'dropdown';
    this.languageKlass = 'dropdown';

  }

  toggleNotificationView() {
    this.notifKlass = this.notifKlass === 'dropdown' ? 'dropdown open' : 'dropdown';
    this.messageKlass = 'dropdown';
    this.languageKlass = 'dropdown';
    this.klass = 'dropdown';
  }

  toggleMessageView() {
    this.messageKlass = this.messageKlass === 'dropdown' ? 'dropdown open' : 'dropdown';
    this.notifKlass = 'dropdown';
    this.languageKlass= 'dropdown';
    this.klass = 'dropdown';
  }
  toggleLanguageView() {
    this.languageKlass = this.languageKlass === 'dropdown' ? 'dropdown open' : 'dropdown';
    this.notifKlass = 'dropdown';
    this.messageKlass = 'dropdown';
    this.klass = 'dropdown';
  }


  toggleSideBar() {
    this.sideBarToggle = !this.sideBarToggle;
    this.togglesidebar.emit(this.sideBarToggle);
  }

  toggleSearch() {
    this.isModalVisible = !this.isModalVisible;
    this.toggleModal.emit(this.isModalVisible);
  }

  logout() {
    localStorage.clear();
    this.keycloakService.logout();
  }

  onSearch() {
    this.searchKeyword= this.searchInput.nativeElement.value
    if(this.searchKeyword) {
      this.router.navigate(['/search'], { queryParams: {
        isAdvanced:false,
        anyword: this.searchKeyword,
        allwords: '',
        documentStart: 0,
        documentEnd: 10,
        dateStart: '',
        dateEnd: '',
        template: '',
        isPrivateDocument:false,
        isInTrash:false
      },skipLocationChange: true });
    } else {
      this.router.navigate(['/search'] );
    }

  }

  auraDocsLogoClicked() {
    this.auraDocsLogo.emit(true);
    this.searchInput.nativeElement.value='';
  }

  markAllSeen(){
      this.notificationsVisible=false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onSearch();
    }
  }

  viewAllNotifications() {
    this.notificationsVisible=true;
  }
  markAllRead(){
    this.messagesVisibility=false;
  }
  viewAllMessages(){
    this.messagesVisibility=true;
  }
  moveToProfilePage(){
    this.router.navigate(['/profile'])
  }
}
