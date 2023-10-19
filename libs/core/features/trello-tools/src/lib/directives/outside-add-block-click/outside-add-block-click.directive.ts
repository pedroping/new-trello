import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, merge, skip, switchMap, takeUntil } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[outsideAddBlockClick]',
})
@UntilDestroy()
export class OutsideAddBlockClickDirective implements OnInit {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly dragAndDropService: DragAndDropService,
    private readonly ngZone: NgZone
  ) {

  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.setValueChanges();
    })
  }

  setValueChanges() {
    merge(this.dragAndDropService.onCardMove$, this.dragAndDropService.onMove$)
      .pipe(
        filter((move) => !!move),
        untilDestroyed(this)
      )
      .subscribe(() => this.ngZone.run(() => {
        this.outsideClickEventsService.outSideClick$.next();
      }));

    this.outsideClickEventsService.startTaking$
      .pipe(
        takeUntil(this.outsideClickEventsService.stopTaking$),
        untilDestroyed(this),
        switchMap(() => {
          return fromEvent(document, 'click').pipe(
            skip(1),
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

        if (!isChildClick) this.ngZone.run(() => {
          this.outsideClickEventsService.outSideClick$.next();
        })
      });
  }
}
