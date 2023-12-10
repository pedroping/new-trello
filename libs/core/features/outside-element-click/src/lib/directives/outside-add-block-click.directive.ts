import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge, skip, takeUntil } from 'rxjs';
export const DEFAULT_ELEMENT = document;
@Directive({
  selector: '[outsideClick]',
})
@UntilDestroy()
@CallSetValueChanges()
export class OutsideAddBlockClickDirective {
  @Input() outSideElement?: HTMLElement;
  @Input() preventClickElement: string[] = [];

  constructor(
    private readonly elementRef: ElementRef,
    private readonly ngZone: NgZone,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  setValueChanges() {
    const baseElemnt = this.outSideElement ?? DEFAULT_ELEMENT;

    merge(fromEvent(baseElemnt, 'click'), fromEvent(baseElemnt, 'mousedown'))
      .pipe(
        skip(1),
        untilDestroyed(this),
        takeUntil(this.outsideClickEventsService.stopTaking$)
      )
      .subscribe((event) => {
        if (!event) return;

        const isChildClick = this.elementRef.nativeElement.contains(
          event.target as Node
        );

        const hasPreventElement = this.preventClickElement.includes(
          (event.target as HTMLElement).id
        );

        if (!isChildClick && !hasPreventElement) {
          this.ngZone.run(() => {
            this.outsideClickEventsService.outSideClick$.next();
          });
        }
      });
  }
}
