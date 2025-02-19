import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Work } from '../../../../models/work';
import { Employee } from '../../../../models/employee';
import { WorkType } from '../../../../models/work-type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { WorkTypeService } from '../../../../services/work-type.service';
import { EmployeeService } from '../../../../services/employee.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { WorkService } from '../../../../services/work.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-create-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './work-create-dialog.component.html',
})
export class WorkCreateDialogComponent {
  workForm: FormGroup;
  employees: Employee[] = [];
  workTypes: WorkType[] = [];
  @Output() workCreated = new EventEmitter<void>();

  ngOnInit() {
    this.workTypeService.getAll().subscribe((data) => {
      this.workTypes = data;
    });
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkCreateDialogComponent>,
    private workTypeService: WorkTypeService,
    private employeeService: EmployeeService,
    private workService: WorkService
  ) {
    this.workForm = this.fb.group({
      workType: [null, Validators.required],
      employees: [[], Validators.required],
      startDate: [null, Validators.required],
      plannedEndDate: [null, Validators.required],
      additionalPayment: [0, [Validators.required, Validators.min(0)]],
    });
  }

  create() {
    if (this.workForm.valid) {
      const newWork: Work = this.workForm.value;
      this.workService.create(newWork).subscribe({
        next: () => {
          this.workCreated.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
