import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { User } from '../../models/user.model';
import {BaseService} from '../base/base.service';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;

  constructor(public af: AngularFire,
              public http: Http) {
    super();
    console.log('Hello UserProvider Provider');

    this.users = this.af.database.list(`/users`);
  }

  create(user: User): firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

}
