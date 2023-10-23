import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnInit
} from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge, skip, takeUntil } from 'rxjs';

export const DEFAULT_ELEMENT = document;
@Directive({
  selector: '[outsideClick]',
})
@UntilDestroy()
export class OutsideAddBlockClickDirective implements OnInit {
  @Input() outSideElement?: HTMLElement;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly ngZone: NgZone,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) { }

  ngOnInit(): void {
    this.setValueChanges();

  }

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

        if (!isChildClick)
          this.ngZone.run(() => {
            this.outsideClickEventsService.outSideClick$.next();
          });
      });

  }
}
