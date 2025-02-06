import { Employee } from './../../../../models/employee';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Work } from '../../../../models/work';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-work-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSelectModule],
  templateUrl: './work-details-dialog.component.html',
})
export class WorkDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Work
  ) {}

  getNormalDateTime(dateTime: Date) {
    return dateTime
      .toString()
      .replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*/, '$3.$2.$1 $4:$5');
  }

  getFormattedFullname(employee: Employee) {
    return `${employee.firstName} ${employee.lastName} ${employee.middleName}`;
  }

  close() {
    this.dialogRef.close();
  }
}
