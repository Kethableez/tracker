export interface ServiceNotification {
  header?: string;
  message?: string;
  type: 'error' | 'success' | 'warning' | 'info';
}
