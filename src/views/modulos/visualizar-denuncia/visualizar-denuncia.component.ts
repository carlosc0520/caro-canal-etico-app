import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotyfService } from 'src/resources/services/dependences/notyf.service';
import { DenunciaService } from 'src/resources/services/modulos/visualizar-denuncia/denuncia.service';

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

  formLogin: FormGroup;

  constructor(
    private denunciaService: DenunciaService,
    private notyf: NotyfService
  ) {
    this.formLogin = new FormGroup({
      CODIGO: new FormControl('', [Validators.required]),
      CONTRASENA: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  onValidateDenuncia() {
    if (!this.isValid) {
      this.notyf.error('Por favor, completa todos los campos requeridos.');
      return;
    }

    let formData = new FormData();
    formData.append('CODIGO', this.formLogin.value.CODIGO);
    formData.append('CONTRASENA', this.formLogin.value.CONTRASENA);

    this.denunciaService.onValidateDenuncia(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.denunciaService.obtenerDenuncia(response.id).subscribe(
            (denunciaResponse: any) => {
              if (denunciaResponse.success) {
               
              } else {
                this.notyf.error(denunciaResponse.message || 'Error al obtener la denuncia: ' + denunciaResponse.message);
              }
            }
          );
        } else {
          this.notyf.error('Error al validar la denuncia: ' + response.message);
        }
      },
      (error: any) => {
        this.notyf.error('Error en la conexión con el servidor: ' + error.message);
      }
    );
  }

  get isValid(): boolean {
    return this.formLogin.valid;
  }
}
