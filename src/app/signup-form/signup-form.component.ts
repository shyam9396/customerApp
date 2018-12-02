import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {userNameValidators} from './username.validator'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      userNameValidators.cannotContainSpace,
      userNameValidators.userNameLength],
      userNameValidators.shouldBeUnique
      ), 
    password: new FormControl('', Validators.required)
  });
  submitLogin(){
    this.form.setErrors({
      invalidLogin:true
    });
  }
  get username(){
    return this.form.get('username');
  }
  get password(){
    return this.form.get('password');
  }
}
