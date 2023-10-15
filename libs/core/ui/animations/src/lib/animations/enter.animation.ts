import { animate, style, transition, trigger } from '@angular/animations';

export const ENTER_ANIMATION = trigger('inPaneAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate(
      '250ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);
