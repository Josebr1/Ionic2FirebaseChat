import { HomePage } from '../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../providers/auth/auth.service';
import { UserService } from '../providers/user/user.service';
import { User } from '../models/user.model';

import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  currentUser: User;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              authService: AuthService,
              userService: UserService) {

    authService
      .afAuth
      .authState
      .subscribe((authState: firebase.User) => {
        if (authState) {

          userService.currentUser
            .valueChanges()
            .subscribe((user: User) => {
              this.currentUser = user;
            });

          this.rootPage = HomePage;
        } else {
          this.rootPage = SigninPage;
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

