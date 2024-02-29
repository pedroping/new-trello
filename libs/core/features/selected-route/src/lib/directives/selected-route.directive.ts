import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IrouteContext } from '../models/models';
@Directive({
  selector: '[selectedRoute]',
  standalone: true,
})
export class SelectedRouteDirective {
  @Input({ required: true }) activedRoute?: string | IrouteContext;
  @Input() clickFunction?: () => void;

  @Input() isChild?: boolean;

  @HostBinding('class.selected') get validate() {
    if (this.isChild && this.isAnString(this.activedRoute))
      return (
        this.activedRoute &&
        this.route.url.includes(this.activedRoute.replace('./', ''))
      );

    if (this.isAnRouteContext(this.activedRoute)) {
      const hasAnRoute = this.activedRoute.children.find((item) =>
        this.route.url.includes(item.path.replace('./', ''))
      );
      return hasAnRoute;
    }

    return false;
  }

  @HostListener('click') onClick() {
    if (this.clickFunction) this.clickFunction();
  }

  constructor(private readonly route: Router) {}

  isAnRouteContext(data: unknown): data is IrouteContext {
    return data != undefined;
  }

  isAnString(data: unknown): data is string {
    return data != undefined;
  }
}
