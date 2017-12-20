import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

import { MyApp } from './app.component';
import { ChatPage } from '../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { AuthService } from '../providers/auth/auth.service';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';
import { UserService } from '../providers/user/user.service';

import {CapitalizePipe} from '../pipes/capitalize.pipe';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBa5gcDij3VODKo8va7RmSjfZdqPTinZ6I",
  authDomain: "ionic2-firebase-chat-38a04.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-38a04.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-38a04.appspot.com",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    SignupPage,
    SigninPage,
    UserProfilePage,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent,
    CapitalizePipe,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    HomePage,
    SignupPage,
    SigninPage,
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
export class AppModule {
}
