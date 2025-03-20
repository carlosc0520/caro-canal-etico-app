import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RelacionEmpresaModel } from 'src/resources/models/RelacionEmpresa.model';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

@Component({
  selector: 'app-datos-denunciante',
  templateUrl: './datos-denunciante.component.html',
  styleUrls: ['./datos-denunciante.component.css']
})
export class DatosDenuncianteComponent implements OnInit {
  formDatosDenunciante: FormGroup;
  relaciones: RelacionEmpresaModel[] = [];

  constructor(
    private formularioDenunciaService: FormularioDenunciaService,
    private route: ActivatedRoute
  ) {
    this.formDatosDenunciante = new FormGroup({
      RelacionEmpresaId: new FormControl('', Validators.required),
      NombresDenunciante: new FormControl(''),
      ApellidosDenunciante: new FormControl(''),
      CorreoDenunciante: new FormControl(''),
      TelefonoDenunciante: new FormControl('')
    });
  }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (!currentPath) return;
    const savedData = this.formularioDenunciaService.getFormData(currentPath);
    if (savedData) {
      this.formDatosDenunciante.patchValue(savedData);
    }

    this.getRelacionEmpresa();
  }

  getRelacionEmpresa() {
    this.formularioDenunciaService.getRelacionEmpresa().subscribe((response: RelacionEmpresaModel[]) => {
      console.log(response);
      this.relaciones = response;
    });
  }


  getFormData() {
    return this.formDatosDenunciante.value;
  }

  setFormData(data: any) {
    if (data) {
      this.formDatosDenunciante.patchValue(data);
    }
  }

  get isValid(): boolean {
    return this.formDatosDenunciante.valid;
  }
}
