import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';

@Directive({
  selector: '[appGenerateIcon]',
  exportAs: 'getIcon',
})
export class GenerateIconDirective implements OnInit {
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
    this.icon = this.darkModeService.darkMode ? 'light_mode' : 'dark_mode';
  }
}
