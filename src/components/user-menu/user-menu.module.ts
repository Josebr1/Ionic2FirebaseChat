import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMenuComponent } from './user-menu';

@NgModule({
  declarations: [
    UserMenuComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserMenuComponent),
  ],
  exports: [
    UserMenuComponent
  ]
})
export class UserMenuComponentModule {}
