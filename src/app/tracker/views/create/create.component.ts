import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SegmentedTabsComponent } from 'src/app/shared/segmented-tabs/segmented-tabs.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';

@Component({
  selector: 'ktbz-create',
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SegmentedTabsComponent,
    ExpenseFormComponent,
    CategoryFormComponent,
    AccountFormComponent,
  ],
})
export class CreateComponent {
  activeForm = 'expense';

  readonly TABS = [
    {
      label: 'Expense',
      value: 'expense',
    },
    { label: 'Category', value: 'category' },
    { label: 'Account', value: 'account' },
  ];

  selectCreateForm(tab: string) {
    this.activeForm = tab;
  }
}
