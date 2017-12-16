import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2/angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from "@angular/http";

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBa5gcDij3VODKo8va7RmSjfZdqPTinZ6I",
  authDomain: "ionic2-firebase-chat-38a04.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-38a04.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-38a04.appspot.com",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
