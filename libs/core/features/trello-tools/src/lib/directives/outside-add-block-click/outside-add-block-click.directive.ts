import { Directive, ElementRef, OnInit } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { filter, fromEvent, of, switchMap, takeUntil } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[outsideAddBlockClick]',
})
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
    this.dragAndDropService.onCardMove$
      .pipe(filter((move) => !!move))
      .subscribe(() => this.outsideClickEventsService.outSideClick$.next());
      
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
