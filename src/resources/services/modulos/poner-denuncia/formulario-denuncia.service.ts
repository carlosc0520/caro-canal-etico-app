import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import config from 'src/resources/endpoints';
import { TipoDenunciaModel } from 'src/resources/models/TipoDenuncia.model';
import { ReceptorModel } from 'src/resources/models/Receptor.model';
import { RelacionEmpresaModel } from 'src/resources/models/RelacionEmpresa.model';

@Injectable({
  providedIn: 'root'
})
export class FormularioDenunciaService {
  private apiUrl: string = `${config.URL}/canaldenuncias/configuracion/Index?handler`;
  private apiUrlDenuncia: string = `${config.URL}/canaldenuncias/denuncias/Index?handler`;

  private TipoDenunciaUrl: TipoDenunciaModel[] = [];
  private ReceptorUrl: ReceptorModel[] = [];

  private formData: { [key: string]: any } = {};

  constructor(private http: HttpClient) { }

  // POST
  sendData(data: any): Observable<object> {
    const headers = new HttpHeaders({
      'XSRF-TOKEN': '2XJ34B48FM39ASF909SDGDSG'
    });

    return this.http.post(`${this.apiUrlDenuncia}=AddDenuncia`, data, { headers })
      .pipe(
        map((response: any) => {
          return { success: response.codEstado > 0, codigo: `DENUNCIA_${response.codEstado}` };
        })
      );
  }


  // GET
  getTipoDenuncia(): Observable<TipoDenunciaModel[]> {
    return this.http.get<TipoDenunciaModel[]>(`${this.apiUrl}=TipoDenuncia&IDEMPRESA=${config.IDEMPRESA}&TIPO=1&CESTDO=A&start=0&length=1000`)
      .pipe(
        map((response: any) => {
          if (response?.data && response.data.length === 0) {
            return [];
          }

          return response.data;
        })
      );
  }

  getRelacionEmpresa(): Observable<RelacionEmpresaModel[]> {
    return this.http.get<RelacionEmpresaModel[]>(`${this.apiUrl}=TipoDenuncia&IDEMPRESA=${config.IDEMPRESA}&TIPO=2&CESTDO=A&start=0&length=1000`)
      .pipe(
        map((response: any) => {
          if (response?.data && response.data.length === 0) {
            return [];
          }

          return response.data;
        })
      );
  }

  getReceptores(): Observable<ReceptorModel[]> {
    return this.http.get<ReceptorModel[]>(`${this.apiUrl}=Receptor&IDEMPRESA=${config.IDEMPRESA}&CESTDO=A&start=0&length=1000`)
      .pipe(
        map((response: any) => {
          if (response?.data && response.data.length === 0) {
            return [];
          }

          return response.data;
        })
      );
  }

  setFormData(step: string, data: any) {
    this.formData[step] = data;
  }

  getFormData(step: string): any {
    return this.formData[step] || null;
  }

  getFormDataAll(): { [key: string]: any } {
    return this.formData;
  }

  clearFormData() {
    this.formData = {};
  }

}