import { Component } from '@angular/core';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent {
  breadcrumb = [
    { label: 'Inicio', url: '/inicio' },
    { label: 'Módulos', url: '/modulos' }
  ];
}
