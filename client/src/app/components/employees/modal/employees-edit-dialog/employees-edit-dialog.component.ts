import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../models/employee';

@Component({
  selector: 'app-employees-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './employees-edit-dialog.component.html',
})
export class EmployeesEditDialogComponent {
  employeeForm: FormGroup;
  @Output() employeeEdited = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesEditDialogComponent>,
    private service: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeeForm = this.fb.group({
      lastName: [this.data.lastName, Validators.required],
      firstName: [this.data.firstName, Validators.required],
      middleName: [this.data.middleName, Validators.required],
      salary: [this.data.salary, [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    if (this.employeeForm.valid) {
      let editedEmp: Employee = {
        ...this.employeeForm.value,
        _id: this.data._id,
      };
      this.service.edit(editedEmp).subscribe({
        next: () => {
          this.employeeEdited.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
