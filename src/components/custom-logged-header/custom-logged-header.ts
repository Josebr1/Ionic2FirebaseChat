import { MenuController } from 'ionic-angular/components/menu/menu-controller';
import { App } from 'ionic-angular/components/app/app';
import { AuthService } from './../../providers/auth/auth.service';
import { AlertController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title: string;

  constructor(public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController) {

    super(alertCtrl, authService, app, menuCtrl);
    
  }

}
