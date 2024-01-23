import { Directive, ElementRef, HostListener } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, filter, startWith, timer } from 'rxjs';

export const BASE_BLOCK_SIZE = 320;
export const BASE_SIDENAV_SIZE = 350;
export const BASE_ADD_NEW_SIZE = 340;
export const BASE_SCROLL_AREA = 200;
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

  leftEvent$ = new BehaviorSubject<boolean>(false);
  rightEvent$ = new BehaviorSubject<boolean>(false);

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
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
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
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
    e.preventDefault();

    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const onBlockMove = this.cardEventsFacadeService.onMove;

    if (!this.mouseDown && !onBlockMove && !onCardMove) return;

    const hasRightSidenav = this.genericSidenavsFacadeService.rightSideNavState;
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const hasOneSidenav = hasRightSidenav || hasLeftSidenav;
    const rightCalc = hasRightSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;
    const leftCalc = hasLeftSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;

    const blockMoveWithNavs = onBlockMove && hasOneSidenav;

    if (onCardMove || blockMoveWithNavs) {
      if (window.innerWidth - rightCalc < e.pageX) {
        this.leftEvent$.next(false);
        this.startTickEvent(this.rightEvent$, BASE_SCROLL_MOVE_TICK);
        return;
      }

      if (leftCalc > e.pageX) {
        this.rightEvent$.next(false);
        this.startTickEvent(this.leftEvent$, -BASE_SCROLL_MOVE_TICK);
        return;
      }

      this.leftEvent$.next(false);
      this.rightEvent$.next(false);

      return;
    }

    if (!this.mouseDown || onBlockMove || onCardMove) return;

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;
    this.el.nativeElement.parentElement.scrollLeft = this.scrollLeft - scroll;
  }

  startTickEvent(stopEvent$: BehaviorSubject<boolean>, tick: number) {
    stopEvent$.next(false);
    stopEvent$.next(true);
    timer(0, 200)
      .pipe(
        filter(() => {
          const onCardMove = this.cardEventsFacadeService.onCardMove;
          const onBlockMove = this.cardEventsFacadeService.onMove;
          return (onCardMove || onBlockMove) && !!stopEvent$.value;
        })
      )
      .subscribe(() => {
        this.el.nativeElement.parentElement.scrollLeft += tick;
      });
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
