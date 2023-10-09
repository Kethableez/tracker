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
import { AccountBalanceService } from 'src/app/tracker/core/services/account-balance.service';
import { map, switchMap } from 'rxjs';
import { AccountBalance } from 'src/app/tracker/core/models/account-balance.model';
import { Filter } from 'src/app/tracker/core/models/filter.model';

@Component({
  selector: 'ktbz-accounts-list',
  templateUrl: 'accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
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
export class AccountsComponent implements OnInit {
  searchForm!: FormGroup;
  sortableColumns = [
    {
      label: 'Nazwa',
      value: 'name',
    },
    {
      label: 'Saldo',
      value: 'balance',
    },
  ];
  currencies = [
    {
      label: 'Złoty',
      value: 'PLN',
    },
    {
      label: 'Euro',
      value: 'EUR',
    },
    {
      label: 'Dolar',
      value: 'USD',
    },
  ];

  constructor(
    private accountService: AccountService,
    private balanceService: AccountBalanceService,
    private cdr: ChangeDetectorRef,
    private builder: FormBuilder
  ) {}

  getAccountBalance(id: string) {
    return this.balanceService
      .getOne(id)
      .pipe(map((balance) => balance.balance));
  }

  accounts: Account[] = [];
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

    this.accountService
      .getList(page, filters, sorting)
      .pipe(
        switchMap((records) => {
          return this.balanceService
            .getByIds(records.items.map((item) => item.id))
            .pipe(
              map((balances) => {
                return {
                  ...records,
                  items: records.items.map((item) => ({
                    ...item,
                    balance: balances.find(
                      (balance: AccountBalance) => balance.id === item.id
                    )?.balance,
                  })),
                };
              })
            );
        })
      )
      .subscribe((records) => {
        const { items, page, perPage, totalItems, totalPages } = records;
        this.pagination = { page, perPage, totalItems, totalPages };
        this.accounts = items;
        this.cdr.markForCheck();
      });
  }

  initSearchForm() {
    this.searchForm = this.builder.group({
      name: new FormControl(null),
      currency: new FormControl(null),
      balanceFrom: new FormControl(null),
      balanceTo: new FormControl(null),
    });
  }

  clearFilters() {
    this.searchForm.reset();
    this.fetchData();
  }

  getFilterQuery() {
    const { name, currency, balanceFrom, balanceTo } = this.searchForm.value;

    const filter: Filter = {
      withUserId: true,
      filters: [
        {
          property: 'name',
          operator: '~',
          value: name,
        },
        { property: 'currency', operator: '=', value: currency },
        { property: 'balance', operator: '>=', value: balanceFrom },
        { property: 'balance', operator: '<=', value: balanceTo },
      ],
    };

    return filter;
  }
}
