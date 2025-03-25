import { NgModule } from "@angular/core";
import { PanelComponent } from "./panel.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PanelRoutingModule } from "./panel-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
    declarations: [
        PanelComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        PanelRoutingModule,
        DashboardModule
    ]
})
export class PanelModule { }