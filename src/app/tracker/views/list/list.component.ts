import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SegmentedTabsComponent } from 'src/app/shared/segmented-tabs/segmented-tabs.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ExpensesComponent } from './components/expenses/expenses.component';

@Component({
  selector: 'ktbz-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SegmentedTabsComponent,
    AccountsComponent,
    CategoriesComponent,
    ExpensesComponent,
  ],
})
export class CreateComponent {
  activeList = 'expenses';

  readonly TABS = [
    {
      label: 'Wydatki',
      value: 'expenses',
    },
    { label: 'Kategorie', value: 'categories' },
    { label: 'Konta', value: 'accounts' },
  ];

  selectCreateForm(tab: string) {
    this.activeList = tab;
  }
}
