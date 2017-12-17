import { FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BaseService } from '../base/base.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(public af: AngularFire,
              public http: Http) {
    super();
    console.log('Hello UserProvider Provider');
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void{
    this.users = <FirebaseListObservable<User[]>> this.af.database.list(`/users`, {
      query: {
        orderByChild: 'name'
      }
    }).map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude)
    });
  }

  private listenAuthState(): void{
    this.af.auth
    .subscribe((authState: FirebaseAuthState) => {
      if(authState){
        console.log('Auth state alterado!');
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        this.setUsers(authState.auth.uid);
      }
    });
  }

  create(user: User, uuid: string): firebase.Promise<void>{
    return this.af.database.object(`/users/${uuid}`)
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

  get(userId: string): FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>> this.af.database.object(`/users/${userId}`)
    .catch(this.handleObservableError);
  }

}