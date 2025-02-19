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
import { MatInputModule } from '@angular/material/input';
import { WorkTypeService } from '../../../../services/work-type.service';
import { WorkType } from '../../../../models/work-type';

@Component({
  selector: 'app-work-type-create-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './work-type-create-dialog.component.html',
})
export class WorkTypeCreateDialogComponent {
  workTypeForm: FormGroup;
  @Output() workTypeCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkTypeCreateDialogComponent>,
    private service: WorkTypeService
  ) {
    this.workTypeForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      dailyRate: [0, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.service.create(this.workTypeForm.value as WorkType).subscribe({
      next: () => {
        this.workTypeCreated.emit();
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
