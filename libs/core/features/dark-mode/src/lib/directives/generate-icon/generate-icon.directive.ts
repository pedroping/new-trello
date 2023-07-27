import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';

@Directive({
  selector: '[appGenerateIcon]',
})
export class GenerateIconDirective implements OnInit {
  @HostBinding('innerHTML') innerHTML?: string;
  @HostListener('click') changeMode() {
    this.darkModeService.toggleDarkMode();
  }

  constructor(private readonly darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.darkModeChange$.subscribe(() => {});
  }

  setIcon() {}
}
