import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { BehaviorSubject, filter, takeUntil, timer } from 'rxjs';
import {
  BASE_SCROLL_AREA,
  BASE_SCROLL_MOVE_TICK,
  BASE_SIDENAV_SIZE,
} from '../../models/values';

@Directive({
  standalone: true,
})
export class CardMoveDirective {
  @ContentChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  leftEvent$ = new BehaviorSubject<boolean>(false);
  rightEvent$ = new BehaviorSubject<boolean>(false);

  movingOnBorder = false;

  @HostListener('mouseup', ['$event']) onMouseUp() {
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
    this.movingOnBorder = false;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    e.preventDefault();

    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const onBlockMove = this.cardEventsFacadeService.onMove;

    if (!onBlockMove && !onCardMove) return;

    const hasRightSidenav = this.genericSidenavsFacadeService.rightSideNavState;
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const hasOneSidenav = hasRightSidenav || hasLeftSidenav;
    const rightCalc = hasRightSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;
    const leftCalc = hasLeftSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;

    const blockMoveWithNavs = onBlockMove && hasOneSidenav;

    if (onCardMove || blockMoveWithNavs) {
      if (window.innerWidth - rightCalc < e.pageX) {
        this.startTickEvent(this.rightEvent$, BASE_SCROLL_MOVE_TICK);
        this.movingOnBorder = true;
        return;
      }

      if (leftCalc > e.pageX) {
        this.startTickEvent(this.leftEvent$, -BASE_SCROLL_MOVE_TICK);
        this.movingOnBorder = true;
        return;
      }

      this.leftEvent$.next(false);
      this.rightEvent$.next(false);
      this.movingOnBorder = false;
    }
  }

  startTickEvent(stopEvent$: BehaviorSubject<boolean>, tick: number) {
    if (this.movingOnBorder) return;

    const actualEvent$ = stopEvent$.asObservable().pipe(filter((val) => !val));
    stopEvent$.next(false);
    stopEvent$.next(true);

    timer(0, 1)
      .pipe(takeUntil(actualEvent$))
      .subscribe(() => {
        this.pageContent.nativeElement.scrollLeft += tick;
      });
  }
}
