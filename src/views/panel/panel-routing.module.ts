import { NgModule } from "@angular/core";
import { PanelComponent } from "./panel.component";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard',
        loadChildren: () => import('../panel/dashboard/dashboard.module').then(m => m.DashboardModule) 
      },
      { 
        path: 'mis-denuncias',
        loadChildren: () => import('../panel/mis-denuncias/mis-denuncias.module').then(m => m.MisDenunciasModule) 
      },
      { 
        path: 'todas-las-denuncias',
        loadChildren: () => import('../panel/todas-las-denuncias/todas-las-denuncias.module').then(m => m.TodasLasDenunciasModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }