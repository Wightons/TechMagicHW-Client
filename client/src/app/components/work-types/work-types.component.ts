import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { WorkType } from '../../models/work-type';
import { WorkTypeService } from '../../services/work-type.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkTypeCreateDialogComponent } from './modal/work-type-create-dialog/work-type-create-dialog.component';
import { WorkTypeEditDialogComponent } from './modal/work-type-edit-dialog/work-type-edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-work-types',
  standalone: true,
  imports: [
    MatListModule,
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './work-types.component.html',
  styleUrl: './work-types.component.css',
})
export class WorkTypesComponent {
  workTypes$ = new Observable<WorkType[]>();

  constructor(private service: WorkTypeService, private dialog: MatDialog) {}
  private _errorSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.loadWorkTypes();
  }

  loadWorkTypes() {
    this.workTypes$ = this.service.getAll();
  }

  onAddWorkType() {
    const dialogRef = this.dialog.open(WorkTypeCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.workTypeCreated.subscribe(() => {
      this.loadWorkTypes();
    });
  }

  onWorkTypeEdit(type: WorkType) {
    const dialogRef = this.dialog.open(WorkTypeEditDialogComponent, {
      width: '500px',
      data: type,
    });

    dialogRef.componentInstance.workTypeEdited.subscribe(() => {
      this.loadWorkTypes();
    });
  }

  onWorkTypeDelete(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.loadWorkTypes();
      },
      error: () => {
        this._errorSnackBar.open(
          'Cannot delete while the corresponding Work exists',
          'Ok'
        );
      },
    });
  }
}
