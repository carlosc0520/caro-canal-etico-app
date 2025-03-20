import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotyfService {
    private notyf = new Notyf({
        duration: 2000,
        position: { x: 'right', y: 'top' },
        dismissible: true,
    });

    constructor() { }

    success(message: string) {
        this.notyf.success(message);
    }

    error(message: string) {
        this.notyf.error(message);
    }

    swalSuccess(mensaje: string, event: any) {
        Swal.fire({
            title: 'Éxito',
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            showCancelButton: false,
            preConfirm: () => {
                event();
            }
        });
    }


}
