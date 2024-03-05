import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, filter, fromEvent, skip, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenCustomMenuService {
  overlayRef: OverlayRef | null | undefined;
  sub?: Subscription;

  constructor(private readonly overlay: Overlay) {}

  openMenu(
    menu: TemplateRef<unknown>,
    viewContainerRef: ViewContainerRef,
    x: number,
    y: number,
  ) {
    this.closeElement();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
    });

    this.overlayRef?.attach(new TemplatePortal(menu, viewContainerRef));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        skip(1),
        take(1),
      )
      .subscribe(this.closeElement.bind(this));
  }

  closeElement() {
    this.sub?.unsubscribe();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
