import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let msg = error.error?.detail ? error.error.detail : error.error?.title;

        if (error) {
          if (error.status === 400) {
            if (error.error.errors){
              throw error.error;
            } else {
              this.toastr.error(msg, `Error (${error.status.toString()})`);
            }
          }

          if (error.status === 401) {
            this.toastr.error(msg, `Error (${error.status.toString()})`);
            this.router.navigateByUrl("/account/login");
          }

          if (error.status === 403) {
            this.toastr.error(msg, `Error (${error.status.toString()})`);
          }

          if (error.status === 404) {
            if (error.error.detail){
              this.toastr.error(msg, `Error (${error.status.toString()})`);
            }
            if (!request.url.includes("account/login")){
              const navExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl("/error/not-found", navExtras);
            }
          }

          if (error.status === 409) {
            if (error.error.detail){
              throw error.error;
            }
          }

          if (error.status === 500) {
            this.toastr.error(msg, error.status.toString());
            const navExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl("error/server-error", navExtras)
          }
        }
        
        console.log(error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
