import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/feature/home/home.component';


const routes: Routes = [
  {path: "account", loadChildren: () => import("./components/feature/account/account.module").then(m => m.AccountModule)},
  {path: "error", loadChildren: () => import("./components/core/error-pages/error-pages.module").then(m => m.ErrorPagesModule)},
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "**", redirectTo: "home", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }