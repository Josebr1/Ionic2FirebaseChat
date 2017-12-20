import { Content } from 'ionic-angular/components/content/content';
import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AngularFireList, AngularFireObject } from "angularfire2/database";

import { Message } from "../../models/message.model";
import { Chat } from "../../models/chat.model";
import { ChatService } from "../../providers/chat/chat.service";
import { MessageService } from "../../providers/message/message.service";
import { UserService } from "../../providers/user/user.service";
import { AuthService } from "../../providers/auth/auth.service";
import { User } from "../../models/user.model";

import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public userService: UserService,
              public messageService: MessageService,
              public chatService: ChatService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        if (this.recipient.photo) {
          this.chatService
            .mapObjectKey(this.chat1)
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            });
        }

        let doSubcription = () => {
          this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
          this.viewMessages
            .subscribe((message: Message[]) => {
              this.scrollToBottom();
            });
        };

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .valueChanges()
          .first()
          .subscribe((message: Message[]) => {

            if (message.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubcription();
            } else {
              doSubcription();
            }

          });
      });
  }

  sendMessage(newMessage: string): void {

    if (newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

      });
    }
  }


  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }

}
