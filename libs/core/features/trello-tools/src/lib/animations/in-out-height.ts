import { animate, style, transition, trigger } from '@angular/animations';

export const IN_OUT_HEIGHT_ANIMATION = trigger('inOutHeightAnimation', [
  transition(
    ':enter',
    [
      style({ opacity: 0, height: 0 }),
      animate('200ms ease-in-out', style({ opacity: 1, height: '*' })),
    ],
    { params: { height: '-30px' } },
  ),
  transition(
    ':leave',
    [
      style({ opacity: 1, height: '*' }),
      animate('200ms ease-in-out', style({ opacity: 0, height: 0 })),
    ],
    { params: { height: '-30px' } },
  ),
]);
