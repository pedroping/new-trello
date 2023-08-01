import { Directive, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[appSelectedRoute]',
})
export class SelectedRouteDirective {
  @Input({ required: true }) activedRoute?: string;

  @HostBinding('class.selected') get validate() {
    return this.activedRoute && this.route.url.includes(this.activedRoute);
  }

  constructor(private readonly route: Router) {}
}
