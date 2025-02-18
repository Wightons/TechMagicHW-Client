import { Employee } from './../../models/employee';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeesCreateDialogComponent } from './modal/employees-create-dialog/employees-create-dialog.component';
import { EmployeesEditDialogComponent } from './modal/employees-edit-dialog/employees-edit-dialog.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, MatButtonModule, MatDialogModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employees$ = new Observable<Employee[]>();

  ngOnInit() {
    this.loadEmployees();
  }

  constructor(private service: EmployeeService, private dialog: MatDialog) {}

  loadEmployees() {
    this.employees$ = this.service.getAll();
  }

  onAddEmployee() {
    const dialogRef = this.dialog.open(EmployeesCreateDialogComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.employeeCreated.subscribe(() => {
      this.loadEmployees();
    });
  }

  onEditEmployee(emp: Employee) {
    const dialogRef = this.dialog.open(EmployeesEditDialogComponent, {
      width: '500px',
      data: emp,
    });

    dialogRef.componentInstance.employeeEdited.subscribe(() => {
      this.loadEmployees();
    });
  }

  onDeleteEmployee(id: string) {
    this.service.delete(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => {
        console.error(err);
      },
    });
  }
}
