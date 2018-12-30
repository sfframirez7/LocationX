import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { IniciarSesionPage  } from "../iniciar-sesion/iniciar-sesion";
import { RegistrarsePage  } from "../registrarse/registrarse";


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  homePage = HomePage
  iniciarSesionPage = IniciarSesionPage
  registrarsePage = RegistrarsePage


  constructor(
      public navCtrl: NavController
    ,public navParams: NavParams
  )
   {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  pagina_login()
  {
    //this.navCtrl.setRoot(this.iniciarSesionPage)
    this.navCtrl.push(this.iniciarSesionPage)
  }

  pagina_registro()
  {
    this.navCtrl.push(this.registrarsePage);
  }

}
