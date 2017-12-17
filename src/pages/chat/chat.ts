import { MessageService } from './../../providers/message/message.service';
import { ChatService } from './../../providers/chat/chat.service';
import { FirebaseListObservable } from 'angularfire2';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { Message } from '../../models/message.model';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public messageService: MessageService) {
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

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((message: Message[]) => {

            if (message.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

            }

          });
      });
  }

  sendMessage(newMessage: string) {
    this.messages.push(newMessage);
  }

}
