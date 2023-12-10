import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const ICON_STATE_ANIMATION = trigger('iconState', [
  state(
    'expanded',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  transition('collapsed => expanded', animate('300ms ease-in')),
  transition('expanded => collapsed', animate('300ms ease-out')),
]);
