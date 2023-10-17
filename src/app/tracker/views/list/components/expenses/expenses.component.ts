import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { CurrencyPipe } from '../../../dashboard/components/summary/summary.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { CollapseComponent } from 'src/app/shared/collapse/collapse.component';
import { DetailedExpenseService } from '../../../../../core/services/detailed-expense.service';
import { DetailedExpense } from '../../../../../core/models/detailed-expense.model';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { Filter } from '../../../../../core/models/filter.model';

@Component({
  selector: 'ktbz-expenses-list',
  templateUrl: 'expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ListComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    DropdownComponent,
    CollapseComponent,
    InputComponent,
  ],
})
export class ExpensesComponent implements OnInit {
  searchForm!: FormGroup;
  sortableColumns = [
    {
      label: 'Nazwa',
      value: 'name',
    },
    {
      label: 'Kwota',
      value: 'amount',
    },
    {
      label: 'Data',
      value: 'date',
    },
  ];

  types = [
    {
      label: 'Obciążenie',
      value: 'OUTCOME',
    },
    {
      label: 'Uznanie',
      value: 'INCOME',
    },
  ];

  expenses: DetailedExpense[] = [];
  pagination!: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };

  constructor(
    private detailedExpenseService: DetailedExpenseService,
    private cdr: ChangeDetectorRef,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.initSearchForm();
    this.fetchData();
  }

  clearFilters() {
    this.searchForm.reset();
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

    this.detailedExpenseService
      .getList(page, filters, sorting)
      .subscribe((records) => {
        const { items, page, perPage, totalItems, totalPages } = records;
        this.pagination = { page, perPage, totalItems, totalPages };
        this.expenses = items;
        this.cdr.markForCheck();
      });
  }

  initSearchForm() {
    this.searchForm = this.builder.group({
      name: new FormControl(null),
      type: new FormControl(null),
      dateFrom: new FormControl(null),
      dateTo: new FormControl(null),
      amountFrom: new FormControl(null),
      amountTo: new FormControl(null),
    });
  }

  getFilterQuery() {
    const { name, type, dateFrom, dateTo, amountFrom, amountTo } =
      this.searchForm.value;

    const filter: Filter = {
      withUserId: true,
      filters: [
        {
          property: 'name',
          operator: '~',
          value: name,
        },
        {
          property: 'type',
          operator: '=',
          value: type,
        },
        {
          property: 'amount',
          operator: '>=',
          value: amountFrom,
        },
        {
          property: 'amount',
          operator: '<=',
          value: amountTo,
        },
        {
          property: 'date',
          operator: '>=',
          value: this.parseDate(dateFrom, false),
        },
        {
          property: 'date',
          operator: '<=',
          value: this.parseDate(dateTo, true),
        },
      ],
    };

    return filter;
  }

  parseDate(date?: Date, eod = true) {
    if (!date) return undefined;
    const dateum = (date as Date).toLocaleDateString().split('.');
    return `${dateum[2]}-${dateum[1].padStart(2, '0')}-${dateum[0].padStart(
      2,
      '0'
    )} ${eod ? '23:59:59' : '00:00:00'}`;
  }
}
