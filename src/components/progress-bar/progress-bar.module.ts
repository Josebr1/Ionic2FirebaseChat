import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar';

@NgModule({
  declarations: [
    ProgressBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProgressBarComponent),
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ProgressBarComponentModule {}
