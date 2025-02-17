import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../../../models/employee';
import { WorkType } from '../../../../models/work-type';
import { WorkTypeService } from '../../../../services/work-type.service';
import { EmployeeService } from '../../../../services/employee.service';
import { WorkService } from '../../../../services/work.service';
import { Work } from '../../../../models/work';

@Component({
  selector: 'app-work-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './work-edit-dialog.component.html',
})
export class WorkEditDialogComponent {
  workForm: FormGroup;
  employees: Employee[] = [];
  workTypes: WorkType[] = [];
  @Output() workEdited = new EventEmitter<void>();

  ngOnInit() {
    this.workTypeService.getAll().subscribe((data) => {
      this.workTypes = data;

      const selectedWorkType = this.workTypes.find(
        (type) => type._id === this.data.workType?._id
      );

      this.workForm.patchValue({ workType: selectedWorkType });
    });

    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;

      const selectedEmployees = this.data.employees?.map((emp) =>
        this.employees.find((e) => e._id === emp._id)
      );

      this.workForm.patchValue({ employees: selectedEmployees });
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkEditDialogComponent>,
    private workTypeService: WorkTypeService,
    private employeeService: EmployeeService,
    private workService: WorkService,
    @Inject(MAT_DIALOG_DATA) public data: Work
  ) {
    this.workForm = this.fb.group({
      workType: [this.data.workType ?? null, Validators.required],
      employees: [this.data.employees ?? [], Validators.required],
      startDate: [this.data.startDate ?? null, Validators.required],
      plannedEndDate: [this.data.plannedEndDate ?? null, Validators.required],
      additionalPayment: [
        this.data.additionalPayment ?? 0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    if (this.workForm.valid) {
      const updatedWork: Work = {
        ...this.workForm.value,
        _id: this.data._id,
      };
      this.workService.edit(updatedWork).subscribe({
        next: () => {
          this.workEdited.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }
}
