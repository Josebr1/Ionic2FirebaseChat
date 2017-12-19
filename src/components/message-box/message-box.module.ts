import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageBoxComponent } from './message-box';

@NgModule({
  declarations: [
    MessageBoxComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessageBoxComponent),
  ],
  exports: [
    MessageBoxComponent
  ]
})
export class MessageBoxComponentModule {}
