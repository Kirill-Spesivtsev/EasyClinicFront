import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { BadRequestComponent } from './error-pages/bad-request/bad-request.component';
import { UnauthorizedComponent } from './error-pages/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './error-pages/forbidden/forbidden.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavBarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    BadRequestComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ErrorPagesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
  ],
  exports: [
    NavBarComponent,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NotFoundComponent,
    ServerErrorComponent,
    BadRequestComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
