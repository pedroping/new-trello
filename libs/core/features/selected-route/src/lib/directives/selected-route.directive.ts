import { Directive, HostBinding, HostListener, input } from '@angular/core';
import { Router } from '@angular/router';
import { IrouteContext } from '../models/models';
@Directive({
  selector: '[selectedRoute]',
  standalone: true,
})
export class SelectedRouteDirective {
  activedRoute = input.required<string | IrouteContext>();
  clickFunction = input<() => void>();
  isChild = input<boolean>();

  @HostBinding('class.selected') get validate() {
    if (this.isChild() && this.isAnString(this.activedRoute()))
      return (
        this.activedRoute() &&
        this.route.url.includes(
          (this.activedRoute() as string).replace('./', ''),
        )
      );

    if (this.isAnRouteContext(this.activedRoute())) {
      const hasAnRoute = (this.activedRoute() as IrouteContext).children.find(
        (item) => this.route.url.includes(item.path.replace('./', '')),
      );
      return hasAnRoute;
    }

    return false;
  }

  @HostListener('click') onClick() {
    if (this.clickFunction()) this.clickFunction()?.();
  }

  constructor(private readonly route: Router) {}

  isAnRouteContext(data: unknown): data is IrouteContext {
    return data != undefined;
  }

  isAnString(data: unknown): data is string {
    return data != undefined;
  }
}
