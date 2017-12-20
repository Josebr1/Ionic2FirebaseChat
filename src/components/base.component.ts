import { MenuController, NavController } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AuthService } from "../providers/auth/auth.service";
import { App } from "ionic-angular/components/app/app";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { SigninPage } from "../pages/signin/signin";

export abstract class BaseComponent implements OnInit {


  protected navCtrl: NavController;

  constructor(public alertCtrl: AlertController,
              public authService: AuthService,
              public app: App,
              public menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.navCtrl = this.app.getActiveNavs()[0];
  }

  onLogout(): void {
    this.alertCtrl.create({
      message: 'Do you want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.authService.logout()
              .then(() => {
                this.navCtrl.setRoot(SigninPage);
                this.menuCtrl.enable(false, 'user-menu');
              }).catch((error) => {
              console.log(error);
            });
          }
        },
        {
          text: 'No'
        }
      ]
    }).present();
  }
}
