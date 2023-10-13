import { Directive, ElementRef, OnInit } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { fromEvent, of, switchMap, takeUntil } from 'rxjs';

@Directive({
  selector: '[outsideAddBlockClick]',
})
export class OutsideAddBlockClickDirective implements OnInit {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) { }

  ngOnInit(): void {
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
        })
      )
      .subscribe((event) => {
        if (!event) return;

        const isChildClick = this.elementRef.nativeElement.contains(
          event.target
        );

        if (!isChildClick) this.outsideClickEventsService.outSideClick$.next();
      });
  }
}
