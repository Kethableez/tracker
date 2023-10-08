import { trigger, transition, style, animate } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  transition('void => *', [
    style({ height: 0, opacity: 0 }),
    animate(100, style({ height: '*', opacity: 1 })),
  ]),
  transition('* => void', [animate(100, style({ height: 0, opacity: 0 }))]),
]);
