import { Routes } from '@angular/router';
import { WorksComponent } from './components/works/works.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { routeNames } from './constants/route-names';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/works/works.component').then(
        (m) => m.WorksComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: routeNames.works,
    loadComponent: () =>
      import('./components/works/works.component').then(
        (m) => m.WorksComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: routeNames.employees,
    loadComponent: () =>
      import('./components/employees/employees.component').then(
        (m) => m.EmployeesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: routeNames.workTypes,
    loadComponent: () =>
      import('./components/work-types/work-types.component').then(
        (m) => m.WorkTypesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
];
