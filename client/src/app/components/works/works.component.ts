import { WorkService } from './../../services/work.service';
import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { Work } from '../../models/work';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkDetailsDialogComponent } from './modal/work-details-dialog/work-details-dialog.component';
@Component({
  selector: 'app-works',
  standalone: true,
  imports: [MatListModule, AsyncPipe, MatDialogModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  constructor(private service: WorkService, private dialog: MatDialog) {}

  works$ = new Observable<Work[]>();

  ngOnInit() {
    this.works$ = this.service.getAll();
  }

  onWorkSelection(id: string) {
    this.service.getByid(id).subscribe((work: any) => {
      this.dialog.open(WorkDetailsDialogComponent, {
        width: '400px',
        data: work[0],
      });
    });
  }
}
