import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { IsAutorizedGuard } from './auth/guards/is-autorized.guard';
import { LoginComponent } from './auth/login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent as SignupComponent } from './auth/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EmployeesComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsAutorizedGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsAutorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
