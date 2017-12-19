import { UserProfilePage } from './../pages/user-profile/user-profile';
import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2/angularfire2';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';

import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';
import { AuthProviders, AuthMethods } from 'angularfire2';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBa5gcDij3VODKo8va7RmSjfZdqPTinZ6I",
  authDomain: "ionic2-firebase-chat-38a04.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-38a04.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-38a04.appspot.com",
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage,
    UserProfilePage,
    CustomLoggedHeaderComponent,
    CapitalizePipe,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage,
    UserProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    ChatService,
    MessageService
  ]
})
export class AppModule {}
