export interface Filter {
  withUserId: boolean;
  filters: { property: string; operator: string; value: any }[];
}
