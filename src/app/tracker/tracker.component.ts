import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'ktbz-tracker',
  templateUrl: 'tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModule, RouterModule],
})
export class TrackerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
