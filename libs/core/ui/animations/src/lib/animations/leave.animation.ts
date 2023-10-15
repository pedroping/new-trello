import { animate, style, transition, trigger } from '@angular/animations';

export const LEAVE_ANIMATION = trigger('outPaneAnimation', [
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-100%)' })
    ),
  ]),
]);
