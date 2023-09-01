import { Injectable } from '@angular/core';
import { DARK_COLORS, LIGHT_COLORS } from '../../helpers/colors';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkMode = false;
  darkModeChange$ = new Subject<void>();

  constructor() {
    const isDarkMode = sessionStorage.getItem('darkMode');
    this.darkMode = !!isDarkMode;
    if (isDarkMode) {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', DARK_COLORS);
      document.querySelector('html')?.classList.add('darkMode')
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.darkModeChange$.next();
    if (this.darkMode) {
      sessionStorage.setItem('darkMode', 'isDarkMode');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', DARK_COLORS);
      document.querySelector('html')?.classList.add('darkMode')
      return;
    }
    sessionStorage.removeItem('darkMode');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', LIGHT_COLORS);
    document.querySelector('html')?.classList.remove('darkMode')
  }
}
