import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';
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
    console.log(el.nativeElement);
  }
  mouseDown = false;
  startX = 0;
  scrollLeft = 0;

  stopEvent$ = new Subject<void>()

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

    if (!this.mouseDown && !this.dragAndDropService.onMove$.value) {
      return;
    }

    if (this.dragAndDropService.onMove$.value) {
      // console.log(e.pageX, window.innerWidth);
      if (window.innerWidth - 50 < e.pageX) {
        console.log('On right border');
        return
      }

      this.stopEvent$.next()

      if (50 > e.pageX) {
        console.log('On left border');
        this.startLeftEvent()
      }


      // const scroll = e.pageX < 100 ? e.pageX / 4 : window.innerWidth - e.pageX < 100 ? window.innerWidth : e.pageX;
      // el.scrollLeft = scroll;
      return;
    }

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  startLeftEvent() {
    timer(0, 10).pipe(takeUntil(this.stopEvent$)).subscribe(() => {
      console.log('event');
      if (this.dragAndDropService.onMove$.value)
        this.el.nativeElement.scrollLeft--
    })
  }
}
