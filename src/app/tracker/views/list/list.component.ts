import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SegmentedTabsComponent } from 'src/app/shared/segmented-tabs/segmented-tabs.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CategoriesComponent } from './components/categories/categories.component';

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
    // ExpenseFormComponent,
    // CategoryFormComponent,
    // AccountFormComponent,
  ],
})
export class CreateComponent {
  activeList = 'accounts';

  readonly TABS = [
    {
      label: 'Expenses',
      value: 'expenses',
    },
    { label: 'Categories', value: 'categories' },
    { label: 'Accounts', value: 'accounts' },
  ];

  selectCreateForm(tab: string) {
    console.log(tab);
    this.activeList = tab;
  }
}
