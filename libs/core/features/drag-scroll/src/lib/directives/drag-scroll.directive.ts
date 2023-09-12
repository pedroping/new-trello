import {
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[dragScroll]',
})
export class DragScrollDirective {
  constructor(private el: ElementRef, private viewContainer: ViewContainerRef) {
    console.log(el.nativeElement);
  }

  mouseDown = false;

  startX: any;

  scrollLeft: any;

  @HostListener('mousedown', ['$event'])
  startDragging(e: any) {
    const el = this.el.nativeElement;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  stopDragging(e: any) {
    this.mouseDown = false;
    const el = this.el.nativeElement;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: any) {
    const el = this.el.nativeElement;
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    console.log(e);
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll * 3;
  }
}
