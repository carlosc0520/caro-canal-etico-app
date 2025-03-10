import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/router/app-routing.module';
import { InicioComponent } from 'src/views/inicio/inicio.component';
import { LayoutModule } from 'src/views/layout/layout.module';
import { ModulosComponent } from 'src/views/modulos/modulos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PonerDenunciaComponent } from 'src/views/modulos/poner-denuncia/poner-denuncia.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ModulosComponent,
    PonerDenunciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
