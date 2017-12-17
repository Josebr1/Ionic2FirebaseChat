import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

import { FirebaseListObservable } from 'angularfire2';

import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string = 'chats';

  constructor(public authService: AuthService, public navCtrl: NavController, public userService: UserService) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
   }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }


  onSignUp(): void{
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User){
    console.log(user);
    this.navCtrl.push(ChatPage, {
      recipientUser: user
    });
  }

}
