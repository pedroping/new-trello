import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { Subject, filter, fromEvent, of, switchMap, takeUntil } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[outsideAddBlockClick]',
})
export class OutsideAddBlockClickDirective implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    this.setValueChanges();
  }

  setValueChanges() {
    [
      this.dragAndDropService.onCardMove$,
      this.dragAndDropService.onMove$,
    ].forEach((subscription) => {
      subscription
        .pipe(
          filter((move) => !!move),
          takeUntil(this.onDestroy$)
        )
        .subscribe(() => this.outsideClickEventsService.outSideClick$.next());
    });

    this.outsideClickEventsService.startTaking$
      .pipe(
        takeUntil(this.outsideClickEventsService.stopTaking$),
        takeUntil(this.onDestroy$),
        switchMap(() => {
          const body = document.querySelector('body');
          if (!body) return of(null);

          return fromEvent(body, 'click').pipe(
            takeUntil(this.outsideClickEventsService.stopTaking$),
            takeUntil(this.onDestroy$)
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
