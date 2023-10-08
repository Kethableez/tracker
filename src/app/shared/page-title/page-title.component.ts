import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ktbz-page-title',
  templateUrl: 'page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PageTitleComponent {
  @Input() title!: string;
  @Input() parent!: string;
  @Input() helper!: string;

  constructor() {}
}
