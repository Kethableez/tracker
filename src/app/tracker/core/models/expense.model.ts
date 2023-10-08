export interface Expense {
  id: string;
  name: string;
  amount: number;
  accountId: string;
  categoryId: string;
  type: 'INCOME' | 'OUTCOME';
  date: Date;
}
