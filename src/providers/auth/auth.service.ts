import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import { BaseService } from '../base/base.service';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService extends BaseService{

  constructor(public afAuth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User>{
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): Promise<boolean>{
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then((authState: firebase.User) => {
      return authState != null;
    }).catch(this.handlePromiseError);
  }

  logout(): Promise<any>{
    return this.afAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .first()
        .subscribe((authState: firebase.User) => {
           (authState) ? resolve(true) : reject(false);
        });
      });
  }
}
