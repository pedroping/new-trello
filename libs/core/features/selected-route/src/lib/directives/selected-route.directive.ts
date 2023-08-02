import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[appSelectedRoute]',
})
export class SelectedRouteDirective {
  @Input({ required: true }) activedRoute?: string;
  @Input() clickFunction?: Function;

  @HostBinding('class.selected') get validate() {
    return this.activedRoute && this.route.url.includes(this.activedRoute);
  }

  @HostListener('click') onClick() {
    if (this.clickFunction) this.clickFunction();
  }

  constructor(private readonly route: Router) {}
}
