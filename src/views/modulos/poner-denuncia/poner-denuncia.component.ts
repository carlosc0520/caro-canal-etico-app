import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poner-denuncia',
  templateUrl: './poner-denuncia.component.html',
  styleUrls: ['./poner-denuncia.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class PonerDenunciaComponent {

  steps = [
    { label: 'Hechos', path: 'datos-hecho' },
    { label: 'Denunciante', path: 'datos-denunciante' },
    { label: 'Denuncia', path: 'datos-denuncia' },
    { label: 'Testigo', path: 'datos-testigo' },
    { label: 'Archivos', path: 'datos-archivos' },
    { label: 'Finalizar', path: 'finalizar-denuncia' },
    { label: 'Asignar Contraseña', path: 'asignar-contrasena' }
  ];

  breadcrumb = [
    { label: 'Módulos', url: '/modulos' },
    { label: 'Poner denuncia', url: '/detalles' }
  ];

  currentStepIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Detectar la ruta actual al cargar el componente
    this.route.url.subscribe(() => {
      const currentPath = this.route.snapshot.firstChild?.routeConfig?.path;
      this.currentStepIndex = this.steps.findIndex(step => step.path === currentPath);
    });
  }

  goToPrevious() {
    if (this.currentStepIndex > 0) {
      this.router.navigate(['/modulos/poner-denuncia', this.steps[this.currentStepIndex - 1].path]);
    }
  }

  goToNext() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.router.navigate(['/modulos/poner-denuncia', this.steps[this.currentStepIndex + 1].path]);
    }
  }
}
