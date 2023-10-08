import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const chevronRotate = trigger('chevronRotate', [
  state('closed', style({ transform: 'rotate(0)' })),
  state('opened', style({ transform: 'rotate(180deg)' })),
  transition('opened => closed', animate('200ms ease-out')),
  transition('closed => opened', animate('200ms ease-in')),
]);
