import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from 'app/auth/service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _toastrService: CustomToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse.status == 400) {
          this._toastrService.warning(errorResponse.error);
        }
        else if ([401, 403].indexOf(errorResponse.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._router.navigate(['/error/not-authorized']);

          // ? Can also logout and reload if needed
          // this._authenticationService.logout();
          // location.reload(true);
        }
        else if (errorResponse.status == 500){
          this._toastrService.error(errorResponse.error);
        }
        // throwError
        const error = errorResponse.error.message || errorResponse.statusText;
        return throwError(error);
      })
    );
  }
}
