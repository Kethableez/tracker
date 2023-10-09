import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CollapseComponent } from '../collapse/collapse.component';
import { ActionButtonDirective } from '../directives/action-button.directive';
import { ButtonDirective } from '../directives/button.directive';
import { ListPaginationComponent } from './list-pagination/list-pagination.component';
import { Pagination } from './list-pagination/pagination.model';
import { ListSortingComponent } from './list-sorting/list-sorting.component';

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
    ListPaginationComponent,
    ListSortingComponent,
  ],
})
export class ListComponent<T> {
  @Input() items!: T[];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() searchTemplate!: TemplateRef<any>;
  @Input() searchForm!: FormGroup;
  @Input() sortableColumns!: { label: string; value: string }[];
  @Input() pagination!: Pagination;
  @Output() pagingSortingChange = new EventEmitter<any>();
  @Output() onClearFilters = new EventEmitter<void>();

  private nextPage: number | null = null;
  private sorting: string | null = null;

  constructor() {}

  applySearch() {
    this.emitPagingSorting();
  }

  onSort(sorting: string | null) {
    this.sorting = sorting;
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
