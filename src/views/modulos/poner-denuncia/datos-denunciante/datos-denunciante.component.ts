import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

@Component({
  selector: 'app-datos-denunciante',
  templateUrl: './datos-denunciante.component.html',
  styleUrls: ['./datos-denunciante.component.css']
})
export class DatosDenuncianteComponent implements OnInit {
  formDatosDenunciante: FormGroup;
  relaciones: any[] = ['Relacion 1', 'Relacion 2', 'Relacion 3'];

  constructor(
    private formularioDenunciaService: FormularioDenunciaService,
    private route: ActivatedRoute
  ) {
    this.formDatosDenunciante = new FormGroup({
      RelacionEmpresaId: new FormControl(''),
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
