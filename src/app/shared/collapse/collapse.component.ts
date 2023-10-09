import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { expandCollapse } from '../animations/expand-collapse.animation';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { chevronRotate } from '../animations/chevron-rotate.animation';

@Component({
  selector: 'ktbz-collapse',
  templateUrl: 'collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TablerIconsModule],
  animations: [expandCollapse, chevronRotate],
})
export class CollapseComponent implements OnInit {
  @Input() header!: string;

  state: 'opened' | 'closed' = 'closed';

  constructor() {}

  ngOnInit() {}

  toggle(state?: 'opened' | 'closed') {
    if (state) {
      this.state = state;
      return;
    }
    this.state = this.state === 'closed' ? 'opened' : 'closed';
  }
}
