export interface Account {
  id: string;
  balance: number;
  name: string;
  currency: 'PLN' | 'EUR' | 'USD';
  color: string;
}
