import { Injectable } from '@angular/core';
import {PasswordCheckStrength} from "../../enum/passwordCheckStrength";


@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }
  // Expected length of all passwords
  public static get MinimumLength(): number {
    return 8;
  }
  public static get MaximumLength(): number {
    return 30;
  }

  // Regex to check for a common password string - all based on 5+ length passwords
  private commonPasswordPatterns = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%^&*()])[A-Za-z\d$#@!%^&*()]{8,30}$/;

  //
  // Checks if the given password matches a set of common password
  //
  public isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password);
  }

  //
  // Returns the strength of the current password
  //
  public checkPasswordStrength(password: string): PasswordCheckStrength {

    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[\$\#@!%^&*()]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Weak;

    // Check then strenth of this password using some simple rules
    if(password===''){
      currentPasswordStrength = PasswordCheckStrength.NotEntered;
    } else if (password.length < PasswordStrengthService.MinimumLength ) {
      currentPasswordStrength = PasswordCheckStrength.VeryWeak;
    }else if( numberOfElements === 1){
      currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 2 ) {
      currentPasswordStrength = PasswordCheckStrength.Better;
    } else if (numberOfElements === 3) {
      currentPasswordStrength = PasswordCheckStrength.Medium;
    } else if (this.isPasswordCommon(password) === true) {
      currentPasswordStrength = PasswordCheckStrength.Strong;
    } else if(password.length > PasswordStrengthService.MaximumLength){
      currentPasswordStrength = PasswordCheckStrength.invalid;
    }else{
      currentPasswordStrength = PasswordCheckStrength.Strongest;
    }

    // Return the strength of this password
    return currentPasswordStrength;
  }
}

