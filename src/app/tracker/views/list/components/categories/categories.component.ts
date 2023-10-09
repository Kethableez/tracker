import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { Account } from 'src/app/tracker/core/models/account.model';
import { AccountService } from 'src/app/tracker/core/services/account.service';
import { CurrencyPipe } from '../../../dashboard/components/summary/summary.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { CollapseComponent } from 'src/app/shared/collapse/collapse.component';
import { Category } from 'src/app/tracker/core/models/category.model';
import { CategoryService } from 'src/app/tracker/core/services/category.service';
import { Filter } from 'src/app/tracker/core/models/filter.model';

@Component({
  selector: 'ktbz-categories-list',
  templateUrl: 'categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ListComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    CollapseComponent,
  ],
})
export class CategoriesComponent implements OnInit {
  searchForm!: FormGroup;
  sortableColumns = [
    {
      label: 'Nazwa',
      value: 'name',
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private builder: FormBuilder
  ) {}

  categories: Category[] = [];
  pagination!: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };

  ngOnInit() {
    this.initSearchForm();
    this.fetchData();
  }

  fetchData(event?: any) {
    let sorting,
      filters,
      page = 1;
    if (event) {
      sorting = event?.sorting;
      page = event?.page;
    }

    filters = this.getFilterQuery();

    this.categoryService
      .getList(page, filters, sorting)
      .subscribe((records) => {
        const { items, page, perPage, totalItems, totalPages } = records;
        this.pagination = { page, perPage, totalItems, totalPages };
        this.categories = items;
        this.cdr.markForCheck();
      });
  }

  initSearchForm() {
    this.searchForm = this.builder.group({
      name: new FormControl(null),
    });
  }

  clearFilters() {
    this.searchForm.reset();
    this.fetchData();
  }

  getFilterQuery() {
    const { name } = this.searchForm.value;

    const filter: Filter = {
      withUserId: true,
      filters: [
        {
          property: 'name',
          operator: '~',
          value: name,
        },
      ],
    };

    return filter;
  }
}
