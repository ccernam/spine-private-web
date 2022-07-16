import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
   providedIn: 'root'
})
export class CustomToastrService {
  constructor(private _toastr: ToastrService) {}

   success(message: string, title?: string) {
      this._toastr.success(message, title ?? 'Ok');
   }

   error(message: string, title?: string) {
      this._toastr.error(message, title ?? 'Error');
   }

   warning(message: string, title?: string) {
      this._toastr.warning(message, title ?? 'Validación');
   }

   info(message: string, title?: string) {
      this._toastr.info(message, title ?? 'Información');
   }
}