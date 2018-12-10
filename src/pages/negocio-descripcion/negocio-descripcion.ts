import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

import { LoadingController } from "ionic-angular";
import { ToastController  } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-negocio-descripcion',
  templateUrl: 'negocio-descripcion.html',
})
export class NegocioDescripcionPage {

  negocio:any;
  entidad:any;
  favoritos:any;

  Nombre:string;
  Descripcion:string;
  Correo:string;
  PaginaWeb:string;
  Telefono:string;
  UrlImagen:string;
  Sucursales:any;
  Favorito:string;
  Guardar:string;


  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public fireBaseService: FirebaseServiceProvider
      ,public loadingCtrl :LoadingController
      ,public toastCtrl: ToastController
    ) 
    {
      this.negocio = this.navParams.get("negocio");  
      this.MostrarEntidad();
      this.MostrarSucursales();
      this.EsFavorito()
      this.Guardar = "Guardado";
      this.Guardar = "NoGuardado";
    }

    MostrarEntidad()
    {
    
      let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
      });
      loading.present();
    
      this.fireBaseService.ObtenerEntidad(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        this.entidad = entidad[0];
        this.Nombre = this.entidad.Nombre;
        this.Descripcion  = this.entidad.Descripcion;
        this.Correo  = this.entidad.Correo;
        this.PaginaWeb  = this.entidad.PaginaWeb;
        this.Telefono  = this.entidad.Telefono;
        this.UrlImagen  = this.entidad.UrlImagen;
        loading.dismiss();
      });
    }

    MostrarSucursales()
    {
      this.fireBaseService.ObteneSucursales(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        console.log(entidad)
        this.Sucursales = entidad;
      })
    }

    AgregarQuitarFavorito()
    {
      
      if(this.Favorito == "EsFavorito")
       {
        this.fireBaseService.QuitarFavorito(this.negocio);
        this.Favorito = "NoEsFavorito";
        this.showMessage("Removido de favoritos");
       }
       else
       {
        this.fireBaseService.AgregarFavorito(this.negocio);
        this.Favorito = "EsFavorito"
        this.showMessage("Agregado a favoritos");
       }

    }

    EsFavorito()
    {
      this.fireBaseService.ObtenerFavoritos("usuario2").valueChanges().subscribe(favoritos =>
      {
        this.favoritos = favoritos;
        this.Favorito = "NoEsFavorito";
        this.favoritos.forEach(favorito => {
          if (favorito.Entidad == this.negocio.Entidad)
            {
              this.Favorito = "EsFavorito";
            }
        });
      });
    }

    GuardarLocal()
    {

      if(this.Guardar == "Guardado")
        this.Guardar = "NoGuardado";
      else
        this.Guardar = "Guardado";
    }

    showMessage(mensaje)
    {
      const toast = this.toastCtrl.create({
        message: mensaje,
        duration:1000
      });
      toast.present();
    }


}
