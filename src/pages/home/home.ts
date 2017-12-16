import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

import { FirebaseListObservable } from 'angularfire2';

import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController, public userService: UserService) {

  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }


  onSignUp(): void{
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User){
    console.log(user);
  }

}
