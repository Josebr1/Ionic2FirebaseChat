import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BaseService } from '../base/base.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

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

  userExists(userName: string): Observable<boolean>{
    return this.af.database.list(`/users`, {
      query: {
        orderByChild: 'username',
        equalTo: userName
      }
    }).map((users: User[]) => {
        return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
