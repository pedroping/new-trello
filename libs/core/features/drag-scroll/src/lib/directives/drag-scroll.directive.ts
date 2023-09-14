import { Directive, ElementRef, HostListener } from '@angular/core';
import { DragAndDropService } from '@my-monorepo/core/features/trello-tools';
import { Subject, takeUntil, timer } from 'rxjs';
@Directive({
  selector: '[dragScroll]',
})
export class DragScrollDirective {
  constructor(
    private el: ElementRef,
    readonly dragAndDropService: DragAndDropService
  ) {
    console.log(el.nativeElement.parentElement);
  }
  mouseDown = false;
  startX = 0;
  scrollLeft = 0;

  stopLeftEvent$ = new Subject<void>();
  stopRightEvent$ = new Subject<void>();

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const el = this.el.nativeElement;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
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

    if (!this.mouseDown && !this.dragAndDropService.onMove$.value) {
      return;
    }

    if (this.dragAndDropService.onMove$.value) {
      if (window.innerWidth - 50 < e.pageX) {
        this.startRightEvent();
        return;
      }
      this.stopRightEvent$.next();
      if (!this.dragAndDropService.onMove$.value)
        this.el.nativeElement.style.width = 'auto';

      if (50 > e.pageX) {
        this.startLeftEvent();
        return;
      }
      this.stopLeftEvent$.next();
      if (!this.dragAndDropService.onMove$.value)
        this.el.nativeElement.style.width = 'auto';

      return;
    }

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  startLeftEvent() {
    timer(0, 1)
      .pipe(takeUntil(this.stopLeftEvent$))
      .subscribe(() => {
        if (this.dragAndDropService.onMove$.value)
          this.el.nativeElement.scrollLeft--;
      });
  }

  startRightEvent() {
    timer(0, 1)
      .pipe(takeUntil(this.stopRightEvent$))
      .subscribe(() => {
        if (this.dragAndDropService.onMove$.value) {
          this.el.nativeElement.style.width = '2000px';
          this.el.nativeElement.scrollLeft += 5;
        }
      });
  }
}
