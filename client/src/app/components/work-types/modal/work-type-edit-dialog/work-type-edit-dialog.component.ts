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
import { WorkTypeService } from '../../../../services/work-type.service';
import { WorkType } from '../../../../models/work-type';

@Component({
  selector: 'app-work-type-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './work-type-edit-dialog.component.html',
})
export class WorkTypeEditDialogComponent {
  workTypeForm: FormGroup;
  @Output() workTypeEdited = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkTypeEditDialogComponent>,
    private service: WorkTypeService,
    @Inject(MAT_DIALOG_DATA) public data: WorkType
  ) {
    this.workTypeForm = this.fb.group({
      description: [
        this.data.description,
        [Validators.required, Validators.maxLength(255)],
      ],
      dailyRate: [this.data.dailyRate, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    const editType: WorkType = {
      ...this.workTypeForm.value,
      _id: this.data._id,
    };

    this.service.edit(editType).subscribe({
      next: () => {
        this.workTypeEdited.emit();
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
