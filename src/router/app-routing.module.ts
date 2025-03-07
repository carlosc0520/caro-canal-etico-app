import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "src/views/inicio/inicio.component";
import { LayoutComponent } from "src/views/layout/layout.component";

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,  
        children: [
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full'
            },
            {
                path: 'inicio',
                component: InicioComponent
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {};