import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

@Component({
  selector: 'app-datos-hecho',
  templateUrl: './datos-hecho.component.html',
  styleUrls: ['./datos-hecho.component.css']
})
export class DatosHechoComponent {
  formDatosHecho: FormGroup;
  empresas: any[] = ['Empresa 1', 'Empresa 2', 'Empresa 3'];
  tiposDenuncia: any[] = ['Tipo 1', 'Tipo 2', 'Tipo 3'];

  constructor(
    private formularioDenunciaService: FormularioDenunciaService,
    private route: ActivatedRoute
  ) {
    this.formDatosHecho = new FormGroup({
      EmpresaId: new FormControl('', Validators.required),
      TipoDenunciaId: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (!currentPath) return;

    const savedData = this.formularioDenunciaService.getFormData(currentPath);
    if (savedData) {
      this.formDatosHecho.patchValue(savedData);
    }
  }

  getFormData() {
    return this.formDatosHecho.value;
  }

  setFormData(data: any) {
    if (data) {
      this.formDatosHecho.patchValue(data);
    }
  }

  get isValid(): boolean {
    return this.formDatosHecho.valid;
  }
}
