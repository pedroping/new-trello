import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';
import { DragAndDropService } from '@my-monorepo/core/features/trello-tools';
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

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const el = this.el.nativeElement;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  stopDragging(e: MouseEvent) {
    this.mouseDown = false;
    const el = this.el.nativeElement;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    const el = this.el.nativeElement;
    e.preventDefault();

    if (!this.mouseDown && !this.dragAndDropService.onMove$.value) {
      return;
    }

    if (this.dragAndDropService.onMove$.value) {
      console.log(e.pageX / 1.5);
      const scroll = e.pageX < 70 ? 0 : e.pageX / 2;
      el.scrollLeft = scroll;
      return;
    }

    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }
}
