import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { filter, fromEvent, merge, skip, takeUntil } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DragAndDropService } from '@my-monorepo/core/features/trello-tools';

export const DEFAULT_ELEMENT = document.querySelector('body')!;

@Directive({
  selector: '[outsideClick]',
})
@UntilDestroy()
export class OutsideAddBlockClickDirective implements OnInit {
  @Input() outSideElement?: HTMLElement;
  @Output('outsideClickEvent') outputEvent = new EventEmitter<void>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly ngZone: NgZone,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.setValueChanges();
    });
  }

  setValueChanges() {
    const baseElemnt = this.outSideElement ?? DEFAULT_ELEMENT;

    fromEvent(baseElemnt, 'click')
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

        if (!isChildClick)
          this.ngZone.run(() => {
            this.outsideClickEventsService.outSideClick$.next();
          });
      });

    merge(this.dragAndDropService.onCardMove$, this.dragAndDropService.onMove$)
      .pipe(
        filter((move) => !!move),
        untilDestroyed(this),
        takeUntil(this.outsideClickEventsService.stopTaking$)
      )
      .subscribe(() =>
        this.ngZone.run(() => {
          this.outsideClickEventsService.outSideClick$.next();
        })
      );
  }
}
