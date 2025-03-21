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
  isDenunciaOk: boolean = false;
  denuncia: any = false;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private denunciaService: DenunciaService,
    private notyf: NotyfService
  ) {
    this.formLogin = new FormGroup({
      CODIGO: new FormControl('DENUNCIA_36', [Validators.required]),
      CONTRASENA: new FormControl('12345cC.', [Validators.required]),
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

    this.loading = true;
    this.denunciaService.onValidateDenuncia(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.denunciaService.obtenerDenuncia(response.id).subscribe(
            (denunciaResponse: any) => {
              this.loading = false;
              if (denunciaResponse.success) {
                this.isDenunciaOk = true;
                this.denuncia = denunciaResponse.data;
                this.denuncia.gddenuncia = denunciaResponse.data.gddenuncia == '1' ? 10
                  : denunciaResponse.data.gddenuncia == '2' ? 25
                    : denunciaResponse.data.gddenuncia == '3' ? 40
                      : denunciaResponse.data.gddenuncia == '4' ? 55
                        : denunciaResponse.data.gddenuncia == '5' ? 70
                          : denunciaResponse.data.gddenuncia == '6' ? 100
                                  : 100;
                console.log(denunciaResponse.data);
                this.notyf.success('Mostrando denuncia con éxito');
              } else {
                this.notyf.error(denunciaResponse.message || 'Error al obtener la denuncia: ' + denunciaResponse.message);
              }
            }
          );
        } else {
          this.loading = false;
          this.notyf.error('Error al validar la denuncia: ' + response.message);
        }
      },
      (error: any) => {
        this.loading = false;
        this.notyf.error('Error en la conexión con el servidor: ' + error.message);
      }
    );
  }
  
  logout() {
    this.denuncia = {} as any;
    this.isDenunciaOk = false;
    this.formLogin.reset();
    this.formLogin.get('CODIGO')?.setValue('DENUNCIA_36');
    this.formLogin.get('CONTRASENA')?.setValue('12345cC.');
  }

  get isValid(): boolean {
    return this.formLogin.valid;
  }
}
