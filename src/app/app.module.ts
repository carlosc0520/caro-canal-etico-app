import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/router/app-routing.module';
import { InicioComponent } from 'src/views/inicio/inicio.component';
import { LayoutModule } from 'src/views/layout/layout.module';
import { ModulosComponent } from 'src/views/modulos/modulos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PonerDenunciaComponent } from 'src/views/modulos/poner-denuncia/poner-denuncia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosHechoComponent } from 'src/views/modulos/poner-denuncia/datos-hecho/datos-hecho.component';
import { DatosDenuncianteComponent } from 'src/views/modulos/poner-denuncia/datos-denunciante/datos-denunciante.component';
import { DatosDenunciaComponent } from 'src/views/modulos/poner-denuncia/datos-denuncia/datos-denuncia.component';
import { DatosTestigoComponent } from 'src/views/modulos/poner-denuncia/datos-testigo/datos-testigo.component';
import { DatosArchivosComponent } from 'src/views/modulos/poner-denuncia/datos-archivos/datos-archivos.component';
import { FinalizarDenunciaComponent } from 'src/views/modulos/poner-denuncia/finalizar-denuncia/finalizar-denuncia.component';
import { AsignarContrasenaComponent } from 'src/views/modulos/poner-denuncia/asignar-contrasena/asignar-contrasena.component';
import { LoaderComponent } from 'src/views/layout/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ModulosComponent,
    PonerDenunciaComponent,
    DatosHechoComponent,
    DatosDenuncianteComponent,
    DatosDenunciaComponent, 
    DatosTestigoComponent,
    DatosArchivosComponent,
    FinalizarDenunciaComponent,
    AsignarContrasenaComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
