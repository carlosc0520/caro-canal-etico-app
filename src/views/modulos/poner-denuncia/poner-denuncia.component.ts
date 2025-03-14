import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

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
export class PonerDenunciaComponent implements OnInit {

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
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private formularioDenunciaService: FormularioDenunciaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.url.subscribe(() => {
      const currentPath = this.route.snapshot.firstChild?.routeConfig?.path;
      this.currentStepIndex = this.steps.findIndex(step => step.path === currentPath);
    });
    window.addEventListener('beforeunload', this.preventExit);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.preventExit);
  }

  preventExit = (event: BeforeUnloadEvent) => {
    const formData = this.formularioDenunciaService.getFormDataAll();
    if (Object.keys(formData).length > 0) { 
      event.preventDefault();
      event.returnValue = 'Los datos ingresados se perderán. ¿Estás seguro de salir?';
    }
  };

  confirmExit(event: Event, url: string) {
    event.preventDefault();
    
    const formData = this.formularioDenunciaService.getFormDataAll();
    if (Object.keys(formData).length > 0) { 
      const confirmExit = confirm('Los datos ingresados se perderán. ¿Estás seguro de salir?');
      if (!confirmExit) return;
    }
    
    this.router.navigateByUrl(url);
    this.formularioDenunciaService.clearFormData();
  }

  goToPrevious() {
    if (this.currentStepIndex > 0) {
      this.router.navigate(['/modulos/poner-denuncia', this.steps[this.currentStepIndex - 1].path]);
    } else if(this.currentStepIndex === 0) {
    }
  }

  goToNext() {
    const currentComponent: any = this.getCurrentComponent();
    
    if (currentComponent && typeof currentComponent.getFormData === 'function') {
      const data = currentComponent.getFormData();      
      this.formularioDenunciaService.setFormData(this.steps[this.currentStepIndex].path, data);
    }

    if (this.currentStepIndex < this.steps.length - 1) {
      this.router.navigate(['/modulos/poner-denuncia', this.steps[this.currentStepIndex + 1].path]);
    } else {
      this.loading = true;
      // aqui llamamos al api para enviar los datos
      this.formularioDenunciaService.clearFormData();
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/modulos/poner-denuncia/datos-hecho']);
      }, 2000);
    }
  }

  getCurrentComponent(): any {
    const context = this.contexts.getContext('primary');
    return context?.outlet?.isActivated ? context.outlet.component : null;
  }

  isNextDisabled(): boolean {
    const currentComponent: any = this.getCurrentComponent();
    return !currentComponent || !currentComponent.isValid;
  }
}