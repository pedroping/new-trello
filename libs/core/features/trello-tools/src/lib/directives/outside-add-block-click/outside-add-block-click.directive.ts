import { Directive, ElementRef } from '@angular/core';
import { filter, fromEvent, of, switchMap, takeUntil } from 'rxjs';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';

@Directive({
  selector: '[outsideAddBlockClick]',
})
export class OutsideAddBlockClickDirective {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {
    this.setValueChanges();
  }

  setValueChanges() {
    this.outsideClickEventsService.startTaking$
      .pipe(
        takeUntil(this.outsideClickEventsService.stopTaking$),
        switchMap(() => {
          const body = document.querySelector('body');
          if (!body) return of(null);

          return fromEvent(body, 'click').pipe(
            takeUntil(this.outsideClickEventsService.stopTaking$)
          );
        }),
        filter((event) => !!event)
      )
      .subscribe((event) => {
        const isChildClick = this.elementRef.nativeElement.contains(
          event!.target
        );

        if (!isChildClick) this.outsideClickEventsService.outSideClick$.next();
      });
  }
}
