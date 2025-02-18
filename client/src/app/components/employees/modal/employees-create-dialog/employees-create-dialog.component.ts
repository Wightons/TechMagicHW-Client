import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../models/employee';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employees-create-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './employees-create-dialog.component.html',
})
export class EmployeesCreateDialogComponent {
  employeeForm: FormGroup;
  @Output() employeeCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesCreateDialogComponent>,
    private service: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.service.create(this.employeeForm.value as Employee).subscribe({
      next: () => {
        this.employeeCreated.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
