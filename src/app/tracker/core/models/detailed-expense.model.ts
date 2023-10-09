export interface DetailedExpense {
  id: string;
  name: string;
  amount: number;
  type: 'INCOME' | 'OUTCOME';
  date: Date;
  categoryName: string;
  categoryColor: string;
  accountName: string;
  accountColor: string;
}
