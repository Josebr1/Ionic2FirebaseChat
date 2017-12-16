import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from "../../models/user.model";

import { FirebaseAuthState } from "angularfire2";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public authService: AuthService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public userService: UserService) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(): void {
    console.log('Form submitted!');

    let user: User = this.signupForm.value;

    this.authService.createAuthUser({
      email: user.email,
      password: user.password
    }).then((authSate: FirebaseAuthState) => {

      this.userService.create(this.signupForm.value)
        .then(() => {
          console.log('User created!');
        });

    });
  }
}
