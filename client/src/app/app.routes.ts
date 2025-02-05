import { Routes } from '@angular/router';
import { WorksComponent } from './components/works/works.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { routeNames } from './constants/route-names';
import { WorkTypesComponent } from './components/work-types/work-types.component';

export const routes: Routes = [
  { path: '', component: WorksComponent },
  { path: routeNames.works, component: WorksComponent },
  { path: routeNames.employees, component: EmployeesComponent },
  { path: routeNames.workTypes, component: WorkTypesComponent },
];
