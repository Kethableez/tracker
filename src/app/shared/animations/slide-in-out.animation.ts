import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(20px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(-20px)' })
    ),
  ]),
]);

export const slideInOutStagger = trigger('slideInOutStagger', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        animate(
          '200ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-20px)' })
        ),
      ],
      { optional: true }
    ),
  ]),
  // transition(':enter', [
  //   style({ opacity: 0, transform: 'translateX(20px)' }),
  //   animate(
  //     '200ms ease-in-out',
  //     style({ opacity: 1, transform: 'translateX(0)' })
  //   ),
  // ]),
  // transition(':leave', [
  //   animate(
  //     '200ms ease-in-out',
  //     style({ opacity: 0, transform: 'translateX(-20px)' })
  //   ),
  // ]),
]);
