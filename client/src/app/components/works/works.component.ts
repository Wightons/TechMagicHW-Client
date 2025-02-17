import { WorkService } from './../../services/work.service';
import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { Work } from '../../models/work';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkDetailsDialogComponent } from './modal/work-details-dialog/work-details-dialog.component';
import { getNormalDateTime } from '../../helpers/funcs';
import { MatButtonModule } from '@angular/material/button';
import { WorkCreateDialogComponent } from './modal/work-create-dialog/work-create-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { WorkEditDialogComponent } from './modal/work-edit-dialog/work-edit-dialog.component';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    MatListModule,
    AsyncPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  constructor(private service: WorkService, private dialog: MatDialog) {}

  works$ = new Observable<Work[]>();

  ngOnInit() {
    this.loadWorks();
  }

  loadWorks() {
    this.works$ = this.service.getAll();
  }

  getNormalDateTime(dateTime: Date) {
    return getNormalDateTime(dateTime);
  }

  onWorkSelection(id: string) {
    this.service.getByid(id).subscribe((work) => {
      this.dialog.open(WorkDetailsDialogComponent, {
        width: '400px',
        data: work,
      });
    });
  }

  onAddWork() {
    const dialogRef = this.dialog.open(WorkCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.workCreated.subscribe(() => {
      this.loadWorks();
    });
  }

  onEditWork(work: Work) {
    const dialogRef = this.dialog.open(WorkEditDialogComponent, {
      width: '500px',
      data: work,
    });

    dialogRef.componentInstance.workEdited.subscribe(() => {
      this.loadWorks();
    });
  }

  onDeleteWork(workId: string) {
    this.service.delete(workId).subscribe(
      () => {
        this.loadWorks();
      },
      (error) => {
        console.error('Error deleting work:', error);
      }
    );
  }
}
