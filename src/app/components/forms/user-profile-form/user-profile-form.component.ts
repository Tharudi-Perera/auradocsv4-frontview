import {
  AfterViewInit,
  Component, ElementRef, EventEmitter,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/AppUser.model";

import {Gender} from "../../../enum/gender";

import {PnotifyService} from "../../../services/pnotify/pnotify.service";
import {
  vaildateNewPassword,
  validateEmail,
  validateMobileNumber
} from 'src/app/utility/validator.utility';
import {
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_UNSUCCESS
} from "../../../utility/message-alerts.utility";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {forkJoin} from "rxjs";
import {AuthGuard} from "../../../auth/keycloak.guard";
import {PasswordStrengthService} from "../../../services/password/password-strength.service";
import {PasswordCheckStrength} from "../../../enum/passwordCheckStrength";


@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit, AfterViewInit {
  inputUserName: string
  email: string
  gender: Gender
  mobileNo: number
  isCheckedBoxSelected = false;
  user: User;
  userProfileDetailForm: FormGroup;
  @ViewChild('strength') strength: ElementRef;
  @ViewChild('statusOfPasswordStrength') statusOfPasswordStrength: ElementRef;
  @Output() sendUpdatedTime = new EventEmitter<any>()
  @Output() sendFirstName = new EventEmitter<any>()
  selectedOption:string;
  constructor(public userService: UserService,
              public pnotifyService: PnotifyService,
              public formBuilder: FormBuilder,
              public authService: AuthService,
              public authGuard: AuthGuard,
              public passwordStrength: PasswordStrengthService) {
    this.selectedOption='Select';
    this.userProfileDetailForm = this.formBuilder.group({
      userName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: [+94],
      gender: ['', Validators.required],
      checkbox: [false],
      oldPassword: [''],
      newPassword: [''],
      reEnteredPassword: [''],
      PasswordStrength: [''],
    });
  }

  ngOnInit(): void {
    this.loadCustomerData();
  }

  ngAfterViewInit() {
    this.userProfileDetailForm.get('userName').disable();
    this.userProfileDetailForm.get('PasswordStrength').disable();
  }

  loadCustomerData() {
    this.userService.getCustomer().subscribe({
      next: (data) => {
        this.user = {...data.data};
        this.inputUserName = data.data.username;
        this.email = data.data.email;
        this.mobileNo = data.data.mobileNumber;
        this.sendUpdatedTime.emit(data.data.updatedTime)
        this.sendFirstName.emit(data.data.firstName)
        this.userProfileDetailForm.patchValue({
          userName: this.inputUserName,
          email: this.email,
          mobileNo: this.mobileNo,
          oldPassword: '',
          newPassword: '',
          reEnteredPassword: ''
        })

      }
    });
  }

  updateUser() {
    this.user.email = this.getEmail();
    this.user.gender = this.getGender();
    this.user.mobileNumber = this.getMobileNo();
    this.user.departments = []
    this.user.zipcode = ''
  }

  onUserDetailsChanged() {
    if (this.isCheckedBoxSelected) {
      if (!(this.validatePassword() && this.comparePasswords())) {
        return;
      }
    }
    if (this.isCheckedBoxSelected) {
      this.authService.passwordBody.value = this.getNewPassword();
    }
    this.updateUser();
    this.userService.updateCustomer(this.user).subscribe({
      next: (data: any) => {
        this.sendUpdatedTime.emit(data.data.updatedTime)
        // updateCustomer() succeeded, proceed with other actions
        forkJoin([
          this.authService.resetUserPassword(),
          this.authGuard.updateToken()
        ]).subscribe({
          next: () => {
            // All methods succeeded
            this.pnotifyService.success({
              message: PROFILE_UPDATE_SUCCESS,
              title: PROFILE_UPDATE,
              hasConfirm: true,
              confirmMessage: 'Done'
            });
          },
          error: (e) => {
            // At least one method failed
            this.pnotifyService.error({
              message: PROFILE_UPDATE_UNSUCCESS,
              title: PROFILE_UPDATE,
              hasConfirm: true,
              confirmMessage: 'Done'
            });
          }
        });
      },
      error: (e) => {
        // updateCustomer() failed
        this.pnotifyService.error({
          message: PROFILE_UPDATE_UNSUCCESS,
          title: PROFILE_UPDATE,
          hasConfirm: true,
          confirmMessage: 'Done'
        });
      }
    });
  }

  selectGender(value: string) {
    if (value === "MALE") {
      this.gender = Gender.MALE;
    } else {
      this.gender = Gender.FEMALE;
    }
  }

  cancelButtonClicked() {
    this.loadCustomerData();
  }

  passwordView() {
    this.isCheckedBoxSelected = !!this.getCheckbox();
  }

  getUserName() {
    return this.userProfileDetailForm.get('userName').value
  }

  getEmail() {
    return this.userProfileDetailForm.get('email').value
  }

  getMobileNo() {
    return this.userProfileDetailForm.get('mobileNo').value
  }

  getGender() {
    return this.userProfileDetailForm.get('gender').value
  }

  getCheckbox() {
    return this.userProfileDetailForm.get('checkbox').value
  }

  getNewPassword() {
    return this.userProfileDetailForm.get('newPassword').value
  }

  getReEnteredPassword() {
    return this.userProfileDetailForm.get('reEnteredPassword').value
  }

  validateEmail() {
    return validateEmail(this.getEmail());
  }

  validatePhoneNumber() {
    return validateMobileNumber(this.getMobileNo());
  }

  comparePasswords() {
    return this.getNewPassword() === (this.getReEnteredPassword());
  }

  validatePassword() {
    return vaildateNewPassword(this.getNewPassword());
  }

  passwordStrengthMeter() {
    let strengthOfThePassword = this.passwordStrength.checkPasswordStrength(this.getNewPassword())
    switch (strengthOfThePassword) {
      case PasswordCheckStrength.NotEntered:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Password not entered'
        this.strength.nativeElement.style.width = '60%';
        this.strength.nativeElement.style.backgroundColor = '#CCCCCC';
        break;
      case PasswordCheckStrength.VeryWeak:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Very Weak | Users must have a strong password'
        this.strength.nativeElement.style.width = '60%';
        this.strength.nativeElement.style.backgroundColor = '#CCCCCC';
        break;
      case PasswordCheckStrength.Weak:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Weak | Users must have a strong password'
        this.strength.nativeElement.style.backgroundColor = 'red';
        this.strength.nativeElement.style.width = '10%';
        break;
      case PasswordCheckStrength.Better:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Better | Users must have a strong password'
        this.strength.nativeElement.style.backgroundColor = '#FF5F5F';
        this.strength.nativeElement.style.width = '20%';
        break;
      case PasswordCheckStrength.Medium:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Medium | Users must have a strong password'
        this.strength.nativeElement.style.backgroundColor = '#FF5F5F';
        this.strength.nativeElement.style.width = '30%';
        break;
      case PasswordCheckStrength.Strong:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Strong '
        this.strength.nativeElement.style.backgroundColor = '#4DCD00';
        this.strength.nativeElement.style.width = '40%';
        break;
      case PasswordCheckStrength.Strongest:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Strongest'
        this.strength.nativeElement.style.backgroundColor = '#399800';
        this.strength.nativeElement.style.width = '50%';
        break
      case PasswordCheckStrength.invalid:
        this.statusOfPasswordStrength.nativeElement.innerText = 'Invalid'
        this.strength.nativeElement.style.backgroundColor = 'red';
        this.strength.nativeElement.style.width = '60%';
    }
  }

}
