import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'ktbz-list-sorting',
  templateUrl: 'list-sorting.component.html',
  styleUrls: ['./list-sorting.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TablerIconsModule],
})
export class ListSortingComponent {
  @Input() sortableColumn!: { label: string; value: string }[];
  @Output() onSort = new EventEmitter<string | null>();
  activeSorting: string | null = null;
  sortingDirection: 'ASC' | 'DESC' = 'DESC';

  sorting: string | null = null;

  sort(column: string) {
    if (this.sorting) {
      if (this.sorting.startsWith('-') && this.sorting.slice(1) === column) {
        this.sorting = null;
      } else if (this.sorting === column) {
        this.sorting = `-${column}`;
      } else {
        this.sorting = column;
      }
    } else {
      this.sorting = column;
    }

    this.onSort.emit(this.sorting);
  }

  isActive(column: string) {
    return this.sorting
      ? this.sorting.startsWith('-')
        ? this.sorting.slice(1) === column
        : this.sorting === column
      : false;
  }

  get isAsc() {
    return this.sorting ? this.sorting.startsWith('-') : false;
  }
}
