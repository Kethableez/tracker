import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInOutX = trigger('slideInOutX', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(10px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(-10px)' })
    ),
  ]),
]);

export const slideInOutY = trigger('slideInOutY', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-20px)' })
    ),
  ]),
]);
