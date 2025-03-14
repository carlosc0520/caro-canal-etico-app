import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioDenunciaService } from 'src/resources/services/modulos/poner-denuncia/formulario-denuncia.service';

@Component({
  selector: 'app-datos-denuncia',
  templateUrl: './datos-denuncia.component.html',
  styleUrls: ['./datos-denuncia.component.css']
})
export class DatosDenunciaComponent implements OnInit {
  formDatosDenuncia: FormGroup;
  maxDate: string;

  constructor(
    private formularioDenunciaService: FormularioDenunciaService,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.formDatosDenuncia = new FormGroup({
      FechaIncidencia: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
      DescripcionDenuncia: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (!currentPath) return;
    const savedData = this.formularioDenunciaService.getFormData(currentPath);
    if (savedData) {
      this.formDatosDenuncia.patchValue(savedData);
    }
  }

  getFormData() {
    return this.formDatosDenuncia.value;
  }

  setFormData(data: any) {
    if (data) {
      this.formDatosDenuncia.patchValue(data);
    }
  }

  get isValid(): boolean {
    return this.formDatosDenuncia.valid;
  }
}
