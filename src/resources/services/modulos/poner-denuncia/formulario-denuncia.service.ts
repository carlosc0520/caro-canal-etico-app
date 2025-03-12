import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioDenunciaService {
  private formData: { [key: string]: any } = {};

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