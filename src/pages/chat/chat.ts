import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser
    .first()
    .subscribe((currentUser: User) => {
      this.sender = currentUser;
    });
  }

  sendMessage(newMessage: string){
    this.messages.push(newMessage);
  }

}
