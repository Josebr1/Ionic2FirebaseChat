import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void{
    let loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
    .then((isLogged: boolean) => {

      if(isLogged){
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }
      
    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }
}
