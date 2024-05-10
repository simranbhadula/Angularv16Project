import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate:[authGuard]},
  { path: '**', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
