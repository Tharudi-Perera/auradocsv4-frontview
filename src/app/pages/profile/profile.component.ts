import {Component, ViewChild} from '@angular/core';

import {UserProfileFormComponent} from "../../components/forms/user-profile-form/user-profile-form.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  @ViewChild(UserProfileFormComponent) userProfileFormComponent;
  updatedTime:string
  firstName:string
  constructor() { }
  OnSubmit() {
    this.userProfileFormComponent.onUserDetailsChanged();
  }

  cancel() {
    this.userProfileFormComponent.cancelButtonClicked();
  }

  getUpdatedTime(val: any) {
    this.updatedTime=val
  }

  getFirstName(val: any) {
    this.firstName=val
  }
}
