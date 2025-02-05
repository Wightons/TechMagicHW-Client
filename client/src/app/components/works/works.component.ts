import { WorkService } from './../../services/work.service';
import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { Work } from '../../models/work';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [MatListModule, AsyncPipe],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  constructor(private service: WorkService) {}

  works$ = new Observable<Work[]>();

  ngOnInit() {
    this.works$ = this.service.getAll();
  }
}
