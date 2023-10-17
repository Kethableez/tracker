export interface Category {
	id?: number;
	name: string;
	limit?: number;
	color: string;
	type: 'INCOME' | 'OUTCOME';
}
