import { User } from '../../models/user.model';
import { App } from 'ionic-angular/components/app/app';
import { AuthService } from '../../providers/auth/auth.service';
import { AlertController, MenuController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { UserProfilePage } from '../../pages/user-profile/user-profile';

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
    this.navCtrl.push(UserProfilePage);
  }

}
