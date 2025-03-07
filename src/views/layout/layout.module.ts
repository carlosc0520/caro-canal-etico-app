import { NgModule } from "@angular/core";
import { MainHeaderComponent } from "./main-header/main-header.component";
import { MainFooterComponent } from "./main-footer/main-footer.component";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        MainHeaderComponent,
        MainFooterComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        LayoutComponent
    ],
})
export class LayoutModule {};