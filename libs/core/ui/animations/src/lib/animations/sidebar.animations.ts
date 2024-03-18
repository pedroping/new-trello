import { AnimationMetadata, animate, style } from '@angular/animations';

export const SIDEBAR_ANIMATION_RIGHT_ENTER: AnimationMetadata[] = [
  style({ opacity: 0, transform: 'translateX(100%)' }),
  animate(
    '250ms ease-in-out',
    style({ opacity: 1, transform: 'translateX(0)' }),
  ),
];

export const SIDEBAR_ANIMATION_LEFT_ENTER: AnimationMetadata[] = [
  style({ opacity: 0, transform: 'translateX(-100%)' }),
  animate(
    '250ms ease-in-out',
    style({ opacity: 1, transform: 'translateX(0)' }),
  ),
];

export const SIDEBAR_ANIMATION_RIGHT_EXIT: AnimationMetadata[] = [
  style({ opacity: 1, transform: 'translateX(0)' }),
  animate(
    '250ms ease-in-out',
    style({ opacity: 0, transform: 'translateX(100%)' }),
  ),
];

export const SIDEBAR_ANIMATION_LEFT_EXIT: AnimationMetadata[] = [
  style({ opacity: 1, transform: 'translateX(0)' }),
  animate(
    '250ms ease-in-out',
    style({ opacity: 0, transform: 'translateX(-100%)' }),
  ),
];
