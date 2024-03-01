import { Directive, ElementRef, NgZone, input } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge, skip, takeUntil } from 'rxjs';
import { ElementsService } from '../../services/elements.service';

export const DEFAULT_ELEMENT = document;

@Directive({
  selector: '[outsideClick]',
  standalone: true,
})
@UntilDestroy()
@CallSetValueChanges()
export class OutsideAddBlockClickDirective {
  outSideElement = input<HTMLElement>();

  constructor(
    private readonly ngZone: NgZone,
    private readonly elementRef: ElementRef,
    private readonly elementsService: ElementsService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  setValueChanges() {
    const baseElemnt = this.outSideElement() ?? DEFAULT_ELEMENT;

    merge(fromEvent(baseElemnt, 'click'), fromEvent(baseElemnt, 'mousedown'))
      .pipe(
        skip(1),
        untilDestroyed(this),
        takeUntil(this.outsideClickEventsService.stopTaking$),
      )
      .subscribe((event) => {
        if (!event) return;

        const isChildClick = this.elementRef.nativeElement.contains(
          event.target as HTMLElement,
        );

        const hasPreventElement = this.hasPreventElement(
          event.target as HTMLElement,
        );

        if (!isChildClick && !hasPreventElement) {
          this.ngZone.run(() => {
            this.outsideClickEventsService.outSideClick$.next();
          });
        }
      });
  }

  hasPreventElement(elementEvent: HTMLElement) {
    return !!this.elementsService.elements.find((element) => {
      return element.contains(elementEvent) || element == elementEvent;
    });
  }
}
