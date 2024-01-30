import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, filter, merge, timer } from 'rxjs';
import {
  BASE_SCROLL_AREA,
  BASE_SCROLL_MOVE_TICK,
  BASE_SIDENAV_SIZE,
  LEFT_SIDENAV_GAP,
} from '../../models/values';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';

@Directive({
  selector: '[dragScroll]',
})
@CallSetValueChanges()
export class DragScrollDirective {
  @ContentChild('pageContent', { static: true }) pageContent!: ElementRef;

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

  setValueChanges() {
    merge(
      this.leftEvent$.asObservable(),
      this.rightEvent$.asObservable()
    ).subscribe(() => {
      const isOnBorder = this.leftEvent$.value || this.rightEvent$.value;
      this.cardEventsFacadeService.setOnBorder(isOnBorder);
    });
  }

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const el = this.pageContent.nativeElement;
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
    this.pageContent.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }

  startTickEvent(stopEvent$: BehaviorSubject<boolean>, tick: number) {
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
        this.pageContent.nativeElement.scrollLeft += tick;
      });
  }
}
