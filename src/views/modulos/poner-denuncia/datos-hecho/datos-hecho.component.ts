import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReceptorModel } from 'src/resources/models/Receptor.model';
import { TipoDenunciaModel } from 'src/resources/models/TipoDenuncia.model';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

@Component({
  selector: 'app-datos-hecho',
  templateUrl: './datos-hecho.component.html',
  styleUrls: ['./datos-hecho.component.css']
})
export class DatosHechoComponent {
  formDatosHecho: FormGroup;
  empresas: any[] = [
    {
      id: 1,
      mrca: 'CARO&ASOCIADOS SAC'
    }
  ];
  tiposDenuncia: TipoDenunciaModel[] = [];
  receptores: ReceptorModel[] = [];
  receptorPrincipal: ReceptorModel = {} as ReceptorModel;
  isNotReceptorPrincipal: boolean = false;


  constructor(
    private formularioDenunciaService: FormularioDenunciaService,
    private route: ActivatedRoute,
  ) {
    this.formDatosHecho = new FormGroup({
      EmpresaId: new FormControl('', Validators.required),
      TipoDenunciaId: new FormControl('', Validators.required),
      ReceptorId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (!currentPath) return;

    const savedData = this.formularioDenunciaService.getFormData(currentPath);
    if (savedData) {
      this.formDatosHecho.patchValue(savedData);
    }

    this.getTiposDenuncia();
    this.getReceptores();
  }

  getFormData() {
    return this.formDatosHecho.value;
  }

  setFormData(data: any) {
    if (data) {
      this.formDatosHecho.patchValue(data);
    }
  }

  getTiposDenuncia() {
    this.formularioDenunciaService.getTipoDenuncia().subscribe((response: TipoDenunciaModel[]) => {
      this.tiposDenuncia = response;
    });
  }

  getReceptores() {
    this.formularioDenunciaService.getReceptores().subscribe((response: ReceptorModel[]) => {
      this.receptores = response;
      this.receptorPrincipal = this.receptores.find((receptor: ReceptorModel) => receptor.principal === true) || {} as ReceptorModel;
      this.isNotReceptorPrincipal = this.receptorPrincipal ? false : true;
      if (this.receptorPrincipal) {
        this.formDatosHecho.get('ReceptorId')?.setValue(this.receptorPrincipal.id);
      }
    });
  }

  // * METODOS
  proponerOtroReceptor() {
    this.formDatosHecho.get('ReceptorId')?.setValue(null);
    this.receptorPrincipal = {} as ReceptorModel;
    this.isNotReceptorPrincipal = true;
  }

  onReceptorChange(event: any) {
    const selectedReceptor = this.receptores.find((receptor: ReceptorModel) => receptor.id == this.formDatosHecho.get('ReceptorId')?.value);
    if (selectedReceptor) {
      this.isNotReceptorPrincipal = selectedReceptor.principal ? false : true;
      this.receptorPrincipal = selectedReceptor;
    }
  }

  get isValid(): boolean {
    return this.formDatosHecho.valid;
  }
}
