import { Directive, ElementRef, HostListener } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { startWith } from 'rxjs';

export const BASE_BLOCK_SIZE = 320;
export const BASE_SIDENAV_SIZE = 350;
export const BASE_ADD_NEW_SIZE = 340;
export const BASE_SCROLL_AREA = 100;
export const BASE_SCROLL_MOVE_TICK = 2;
export const LEFT_SIDENAV_GAP = 250;
@Directive({
  selector: '[dragScroll]',
})
@CallSetValueChanges()
export class DragScrollDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  mouseDown = false;
  startX = 0;
  scrollLeft = 0;

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const el = this.el.nativeElement.parentElement;
    this.mouseDown = true;
    this.startX =
      e.pageX - el.offsetLeft + (hasLeftSidenav ? LEFT_SIDENAV_GAP : 0);
    this.scrollLeft = el.scrollLeft;
  }

  @HostListener('mouseup', ['$event']) onMouseUp() {
    this.scrollEventsService.onMouseDown$.next(false);
    this.mouseDown = false;
  }

  @HostListener('mouseleave', ['$event'])
  stopDragging() {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    const el = this.el.nativeElement;
    e.preventDefault();

    const onMove = this.cardEventsFacadeService.onMove;

    if (!this.mouseDown || onMove) {
      return;
    }

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;
    this.el.nativeElement.parentElement.scrollLeft = this.scrollLeft - scroll;
  }

  setValueChanges() {
    this.cardEventsFacadeService.blocks$$
      .pipe(startWith(this.cardEventsFacadeService.blocks))
      .subscribe((blocks) => {
        const length = blocks.length;
        this.el.nativeElement.style.width =
          length * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE + 'px';
      });

    this.scrollEventsService.scrollToEnd$.subscribe(() => {
      const length = this.cardEventsFacadeService.blocks.length;
      this.el.nativeElement.parentElement.scrollLeft +=
        (length + 1) * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE;
    });
  }
}
