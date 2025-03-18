import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-denuncia',
  templateUrl: './visualizar-denuncia.component.html',
  styleUrls: ['./visualizar-denuncia.component.css']
})
export class VisualizarDenunciaComponent implements OnInit {
  breadcrumb = [
    { label: 'Módulos', url: '/modulos' },
    { label: 'Ver denuncias', url: '/ver-denuncias' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
