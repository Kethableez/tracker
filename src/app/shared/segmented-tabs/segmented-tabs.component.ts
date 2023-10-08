import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'ktbz-segmented-tabs',
  templateUrl: 'segmented-tabs.component.html',
  styleUrls: ['./segmented-tabs.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SegmentedTabsComponent {
  @Input() tabs!: { label: string; value: string }[];
  @Input() activeTab!: string;
  @Output() onSelectTab = new EventEmitter<string>();

  constructor() {}

  selectTab(tab: string) {
    this.onSelectTab.emit(tab);
  }
}
