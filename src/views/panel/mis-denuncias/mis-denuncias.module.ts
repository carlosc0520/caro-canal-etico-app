import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MisDenunciasComponent } from "./mis-denuncias.component";

const routes: Routes = [
  { path: '', component: MisDenunciasComponent }
];

@NgModule({
    declarations: [
        MisDenunciasComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        MisDenunciasComponent
    ]
})
export class MisDenunciasModule { }