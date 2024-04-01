import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("account/email-exists") 
        || request.url.includes("account/username-exists")
        || request.url.includes("account/get-current-user")){
      return next.handle(request);
    }

    this.loadingService.startLoading();
    
    return next.handle(request).pipe(
      finalize(() => this.loadingService.endLoading())
    );
  }
}
