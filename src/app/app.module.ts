import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ModulosComponent,
    PonerDenunciaComponent,
    DatosHechoComponent,
    DatosDenuncianteComponent,
    DatosDenunciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
