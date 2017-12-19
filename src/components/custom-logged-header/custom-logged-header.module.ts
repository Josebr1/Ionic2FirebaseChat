import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomLoggedHeaderComponent } from './custom-logged-header';

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomLoggedHeaderComponent),
  ],
  exports: [
    CustomLoggedHeaderComponent
  ]
})
export class CustomLoggedHeaderComponentModule {}
