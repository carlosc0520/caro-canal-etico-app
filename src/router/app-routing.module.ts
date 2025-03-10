import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "src/views/inicio/inicio.component";
import { LayoutComponent } from "src/views/layout/layout.component";
import { ModulosComponent } from "src/views/modulos/modulos.component";
import { AsignarContrasenaComponent } from "src/views/modulos/poner-denuncia/asignar-contrasena/asignar-contrasena.component";
import { DatosArchivosComponent } from "src/views/modulos/poner-denuncia/datos-archivos/datos-archivos.component";
import { DatosDenunciaComponent } from "src/views/modulos/poner-denuncia/datos-denuncia/datos-denuncia.component";
import { DatosDenuncianteComponent } from "src/views/modulos/poner-denuncia/datos-denunciante/datos-denunciante.component";
import { DatosHechoComponent } from "src/views/modulos/poner-denuncia/datos-hecho/datos-hecho.component";
import { DatosTestigoComponent } from "src/views/modulos/poner-denuncia/datos-testigo/datos-testigo.component";
import { FinalizarDenunciaComponent } from "src/views/modulos/poner-denuncia/finalizar-denuncia/finalizar-denuncia.component";
import { PonerDenunciaComponent } from "src/views/modulos/poner-denuncia/poner-denuncia.component";
import { VisualizarDenunciaComponent } from "src/views/modulos/visualizar-denuncia/visualizar-denuncia.component";

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,  
        children: [
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full',
            },
            {
                path: 'inicio',
                component: InicioComponent
            }
        ]
    },
    {
        path: 'modulos',
        data: { animation: 'slideIn' },
        children: [
            {
                path: '',
                component: ModulosComponent
            },
            {
                path: 'poner-denuncia',
                component: PonerDenunciaComponent,  
                children: [
                    {
                        path: '',
                        redirectTo: 'datos-hecho',
                        pathMatch: 'full',
                    },
                    {
                        path: 'datos-hecho',
                        component: DatosHechoComponent,
                    },
                    {
                        path: 'datos-denunciante',
                        component: DatosDenuncianteComponent
                    },
                    {
                        path: 'datos-denuncia',
                        component: DatosDenunciaComponent
                    },
                    {
                        path: 'datos-testigo',
                        component: DatosTestigoComponent
                    },
                    {
                        path: 'datos-archivos',
                        component: DatosArchivosComponent
                    },
                    {
                        path: 'finalizar-denuncia',
                        component: FinalizarDenunciaComponent
                    },
                    {
                        path: 'asignar-contrasena',
                        component: AsignarContrasenaComponent
                    }
                ]
            },
            {
                path: 'ver-denuncias',
                component: VisualizarDenunciaComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio'
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {};