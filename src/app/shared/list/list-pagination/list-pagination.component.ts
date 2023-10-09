import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Pagination } from './pagination.model';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'ktbz-list-pagination',
  templateUrl: 'list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TablerIconsModule],
})
export class ListPaginationComponent {
  @Input() pagination!: Pagination;
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onPreviousPage = new EventEmitter<void>();

  nextPage() {
    this.onNextPage.emit();
  }

  previousPage() {
    this.onPreviousPage.emit();
  }
}
