import { animate, style, transition, trigger } from '@angular/animations';

export const ENTER_LEAVE_ANIMATION_Y = trigger('inOutPaneAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate(
      '250ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' }),
    ),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-100%)' }),
    ),
  ]),
]);
