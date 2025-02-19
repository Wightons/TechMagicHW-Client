import { Employee } from './../../../../models/employee';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Work } from '../../../../models/work';
import { MatSelectModule } from '@angular/material/select';
import { getNormalDateTime } from '../../../../helpers/funcs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSelectModule, MatButtonModule],
  templateUrl: './work-details-dialog.component.html',
})
export class WorkDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Work
  ) {}

  getFormattedFullname(employee: Employee) {
    return `${employee.firstName} ${employee.lastName} ${employee.middleName}`;
  }

  getNormalDateTime(dateTime: Date) {
    return getNormalDateTime(dateTime);
  }

  close() {
    this.dialogRef.close();
  }
}
