import { Inject, Injectable } from '@angular/core';
import {
  DARK_MODE,
  META_DARK_COLOR,
  META_LIGHT_COLOR,
  ON_DARK_MODE,
} from '../../helpers/colors';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = false;

  constructor(
    @Inject(META_LIGHT_COLOR) private readonly metaLightColors: string,
    @Inject(META_DARK_COLOR) private readonly metaDarkColors: string,
  ) {
    this.darkMode = !!sessionStorage.getItem(DARK_MODE);
    this.metaElement.setAttribute('content', this.metaLightColors);
    if (!this.darkMode) return;
    this.metaElement.setAttribute('content', this.metaDarkColors);
    this.htmlElement.classList.add(DARK_MODE);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.htmlElement.classList.add(DARK_MODE);
      sessionStorage.setItem(DARK_MODE, ON_DARK_MODE);
      this.metaElement.setAttribute('content', this.metaDarkColors);
      return;
    }
    sessionStorage.removeItem(DARK_MODE);
    this.htmlElement.classList.remove(DARK_MODE);
    this.metaElement.setAttribute('content', this.metaLightColors);
  }

  get metaElement() {
    return document.querySelector('meta[name="theme-color"]')!;
  }

  get htmlElement() {
    return document.querySelector('html')!;
  }
}
