import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";

@Injectable({
   providedIn: 'root'
})
export class SweetAlertService {
   constructor() { }

   async confirm({ title, text }: { title?: string, text?: string }): Promise<SweetAlertResult<any> | void> {
      const result: SweetAlertResult<any> | void = await Swal.fire({
         title: title ?? 'Confirmar',
         text: text ?? '¿Está seguro que desea continuar?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si',
         cancelButtonText: 'No',
         allowOutsideClick: false,
         allowEscapeKey: false,
         animation: true,
         showClass: {
            popup: 'animate__animated animate__shakeX'
         },
         customClass: {
            confirmButton: 'btn btn-primary btn-sm',
            cancelButton: 'btn btn-info btn-sm ml-1'
         }
      });

      return result;
   }
}