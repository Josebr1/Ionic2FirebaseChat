import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { UserInfoComponent } from './user-info';

@NgModule({
  declarations: [
    UserInfoComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoComponent),
  ],
  exports: [
    UserInfoComponent
  ]
})
export class UserInfoComponentModule {}
