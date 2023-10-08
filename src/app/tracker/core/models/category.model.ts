export interface Category {
  id?: string;
  name: string;
  limit?: number;
  color: string;
  type: 'INCOME' | 'OUTCOME';
}
