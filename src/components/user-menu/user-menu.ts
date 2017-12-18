import { User } from './../../models/user.model';
import { MenuController } from 'ionic-angular/components/menu/menu-controller';
import { App } from 'ionic-angular/components/app/app';
import { AuthService } from './../../providers/auth/auth.service';
import { AlertController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent{

  @Input('user') currentUser: User;

  constructor(public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void{
    
  }

}