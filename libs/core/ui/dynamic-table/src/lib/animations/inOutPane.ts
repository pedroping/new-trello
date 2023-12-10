import { animate, style, transition, trigger } from '@angular/animations';

export const IN_OUT_PANE_ANIMATION = trigger('inOutPaneAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-100%)' }),
    animate('150ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate(
      '300ms ease',
      style({ opacity: 0, transform: 'translateX(-100%)' })
    ),
  ]),
]);
