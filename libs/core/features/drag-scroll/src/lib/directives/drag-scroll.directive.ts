import { Directive, ElementRef, HostListener } from '@angular/core';
import {
  CardMocksService,
  DragAndDropService,
} from '@my-monorepo/core/features/trello-tools';
import { Subject, startWith, takeUntil, timer } from 'rxjs';
@Directive({
  selector: '[dragScroll]',
})
export class DragScrollDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly dragAndDropService: DragAndDropService,
    private readonly cardMocksService: CardMocksService
  ) {
    this.setSize();
  }

  mouseDown = false;
  startX = 0;
  scrollLeft = 0;

  stopLeftEvent$ = new Subject<void>();
  stopRightEvent$ = new Subject<void>();

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const el = this.el.nativeElement.parentElement;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft + 250;
    this.scrollLeft = el.scrollLeft;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  stopDragging() {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    const el = this.el.nativeElement;
    e.preventDefault();
    this.stopRightEvent$.next();
    this.stopLeftEvent$.next();

    console.log(
      this.dragAndDropService.onMove$.value,
      this.dragAndDropService.onCardMove$.value,
      !this.dragAndDropService.onMove$.value &&
        this.dragAndDropService.onCardMove$.value
    );

    if (
      !this.dragAndDropService.onMove$.value &&
      this.dragAndDropService.onCardMove$.value
    ) {
      if (window.innerWidth - 350 < e.pageX) {
        this.startRightEvent();
        return;
      }
      this.stopRightEvent$.next();

      if (350 > e.pageX) {
        this.startLeftEvent();
        return;
      }
      this.stopLeftEvent$.next();

      return;
    }

    if (!this.mouseDown || this.dragAndDropService.onMove$.value) {
      return;
    }

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;

    this.el.nativeElement.parentElement.scrollLeft = this.scrollLeft - scroll;
  }

  startLeftEvent() {
    timer(0, 1)
      .pipe(takeUntil(this.stopLeftEvent$))
      .subscribe(() => {
        if (this.dragAndDropService.onCardMove$.value) {
          this.el.nativeElement.scrollLeft -= 2;
          this.el.nativeElement.parentElement.scrollLeft -= 2;
        }
      });
  }

  startRightEvent() {
    timer(0, 1)
      .pipe(takeUntil(this.stopRightEvent$))
      .subscribe(() => {
        if (this.dragAndDropService.onCardMove$.value) {
          this.el.nativeElement.scrollLeft += 2;
          this.el.nativeElement.parentElement.scrollLeft += 2;
        }
      });
  }

  setSize() {
    this.cardMocksService.blocks$
      .pipe(startWith(this.cardMocksService.blocks$.value))
      .subscribe((blocks) => {
        const length = blocks.length;
        this.el.nativeElement.style.width = length * 320 + 340 + 'px';
      });
  }
}
