import { InjectionToken } from '@angular/core';

export const LIGHT_COLORS = '#674ea7';
export const DARK_COLORS = '#543d96';
export const DARK_MODE = 'darkMode';
export const ON_DARK_MODE = 'isDarkMode';

export const META_DARK_COLOR = new InjectionToken<string>('META_DARK_COLOR', {
  factory: () => DARK_COLORS,
});
export const META_LIGHT_COLOR = new InjectionToken<string>('META_LIGHT_COLOR', {
  factory: () => LIGHT_COLORS,
});
