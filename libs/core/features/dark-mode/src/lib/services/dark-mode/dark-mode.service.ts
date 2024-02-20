import { Injectable } from '@angular/core';
import {
  DARK_COLORS,
  DARK_MODE,
  LIGHT_COLORS,
  ON_DARK_MODE,
} from '../../helpers/colors';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = false;

  constructor() {
    this.darkMode = !!sessionStorage.getItem(DARK_MODE);
    if (this.darkMode) {
      this.metaElement.setAttribute('content', DARK_COLORS);
      this.htmlElement.classList.add(DARK_MODE);
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.htmlElement.classList.add(DARK_MODE);
      sessionStorage.setItem(DARK_MODE, ON_DARK_MODE);
      this.metaElement.setAttribute('content', DARK_COLORS);
      return;
    }
    sessionStorage.removeItem(DARK_MODE);
    this.htmlElement.classList.remove(DARK_MODE);
    this.metaElement.setAttribute('content', LIGHT_COLORS);
  }

  get metaElement() {
    return document.querySelector('meta[name="theme-color"]')!;
  }

  get htmlElement() {
    return document.querySelector('html')!;
  }
}
