import { Directive, ElementRef, OnInit } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, merge, of, switchMap, takeUntil } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[outsideAddBlockClick]',
})
@UntilDestroy()
export class OutsideAddBlockClickDirective implements OnInit {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    this.setValueChanges();
  }

  setValueChanges() {
    merge(this.dragAndDropService.onCardMove$, this.dragAndDropService.onMove$)
      .pipe(
        filter((move) => !!move),
        untilDestroyed(this)
      )
      .subscribe(() => this.outsideClickEventsService.outSideClick$.next());

    this.outsideClickEventsService.startTaking$
      .pipe(
        takeUntil(this.outsideClickEventsService.stopTaking$),
        untilDestroyed(this),
        switchMap(() => {
          const body = document.querySelector('body');
          if (!body) return of(null);

          return fromEvent(body, 'click').pipe(
            takeUntil(this.outsideClickEventsService.stopTaking$),
            untilDestroyed(this)
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
