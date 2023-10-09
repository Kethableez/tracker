import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CollapseComponent } from '../collapse/collapse.component';
import { ActionButtonDirective } from '../directives/action-button.directive';
import { ButtonDirective } from '../directives/button.directive';

@Component({
  selector: 'ktbz-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CollapseComponent,
    ActionButtonDirective,
    TablerIconsModule,
    ButtonDirective,
  ],
})
export class ListComponent<T> {
  withFilters = false;
  @Input()
  items!: T[];
  @Input()
  itemTemplate!: TemplateRef<any>;
  @Input()
  searchTemplate!: TemplateRef<any>;
  @Input()
  searchForm!: FormGroup;
  @Input()
  sortableColumns!: { label: string; value: string }[];

  @Output()
  pagingSortingChange = new EventEmitter<any>();

  @Output()
  onClearFilters = new EventEmitter<void>();

  activeSorting: string | null = null;
  sortingDirection: 'ASC' | 'DESC' = 'DESC';

  @Input()
  pagination!: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };

  nextPage: number | null = null;
  sorting: string | null = null;

  constructor() {}

  applySearch() {
    this.emitPagingSorting();
  }

  selectSorting(sortingColumn: string) {
    if (this.activeSorting !== sortingColumn) {
      this.sortingDirection = 'DESC';
      this.activeSorting = sortingColumn;
      this.sorting = `${this.activeSorting}`;
    } else if (this.activeSorting && this.sortingDirection === 'DESC') {
      this.sortingDirection = 'ASC';
      this.sorting = `-${this.activeSorting}`;
    } else if (this.activeSorting && this.sortingDirection === 'ASC') {
      this.sortingDirection = 'DESC';
      this.activeSorting = null;
      this.sorting = null;
    }
    this.emitPagingSorting();
  }

  next() {
    this.nextPage = this.pagination.page + 1;
    this.emitPagingSorting();
  }

  clearFilters() {
    this.onClearFilters.emit();
  }

  previous() {
    this.nextPage = this.pagination.page - 1;
    this.emitPagingSorting();
  }

  emitPagingSorting() {
    this.pagingSortingChange.emit({
      page: this.nextPage,
      sorting: this.sorting,
    });
  }
}
