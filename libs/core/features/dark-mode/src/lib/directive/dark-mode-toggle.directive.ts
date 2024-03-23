import { Directive, HostListener, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode/dark-mode.service';

@Directive({
  selector: '[darkModeToggle]',
  exportAs: 'darkModeToggle',
  standalone: true,
})
export class DarkModeToggleDirective implements OnInit {
  icon?: string;
  @HostListener('click') changeMode() {
    this.darkModeService.toggleDarkMode();
    this.setIcon();
  }

  constructor(private readonly darkModeService: DarkModeService) {}

  ngOnInit() {
    this.setIcon();
  }

  setIcon() {
    this.icon = this.darkModeService.darkMode$.value ? 'light_mode' : 'dark_mode';
  }
}
