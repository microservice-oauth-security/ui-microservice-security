import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { HomeModule } from './module/home/home.module';
import { canActivateAuth, canActivateHome } from './auth.guard';

const routes: Routes = [
  {
    path : "auth",
    component: AuthComponent,
    canActivate : [canActivateAuth]
  },

  {
    path : "",
    loadChildren : () => HomeModule,
    canActivate : [canActivateHome]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
