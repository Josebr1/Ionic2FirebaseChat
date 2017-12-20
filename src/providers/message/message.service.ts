import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Message } from '../../models/message.model';
import { BaseService } from '../base/base.service';

import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';

@Injectable()
export class MessageService extends BaseService {

  constructor(public db: AngularFireDatabase,) {
    super();
  }

  create(message: Message, listMessages: AngularFireList<Message>): Promise<void> {
    return Promise.resolve(listMessages.push(message));
  }

  getMessages(userId1: string, userId2: string): AngularFireList<Message> {
    return this.db.list(`/messages/${userId1}-${userId2}`, (
      (ref: firebase.database.Reference) => ref.limitToLast(30).orderByChild('timestamp')
    ));
  }
}
