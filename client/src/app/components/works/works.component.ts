import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { Work } from '../../models/work';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  works: Work[] = [];
}
