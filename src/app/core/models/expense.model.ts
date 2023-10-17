export interface Expense {
  id: string;
  name: string;
  amount: number;
  account: string;
  category: string;
  type: 'INCOME' | 'OUTCOME' | 'REBALANCE';
  date: Date;
}
