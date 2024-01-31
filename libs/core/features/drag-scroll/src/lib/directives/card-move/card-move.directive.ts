import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { BehaviorSubject, filter, merge, timer } from 'rxjs';
import {
  BASE_SCROLL_AREA,
  BASE_SCROLL_MOVE_TICK,
  BASE_SIDENAV_SIZE,
} from '../../models/values';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';

@Directive({
  standalone: true,
})
@CallSetValueChanges()
export class CardMoveDirective {
  @ContentChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  leftEvent$ = new BehaviorSubject<boolean>(false);
  rightEvent$ = new BehaviorSubject<boolean>(false);

  @HostListener('mouseup', ['$event']) onMouseUp() {
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
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
  }

  setValueChanges() {
    merge(this.leftEvent$.asObservable(), this.rightEvent$.asObservable())
      .pipe(
        filter(() => {
          const onCardMove = this.cardEventsFacadeService.onCardMove;
          const onBlockMove = this.cardEventsFacadeService.onMove;
          return onCardMove || onBlockMove;
        })
      )
      .subscribe(() => {
        const isOnBorder = this.leftEvent$.value || this.rightEvent$.value;
        this.cardEventsFacadeService.setOnBorder(isOnBorder);
      });
  }

  startTickEvent(stopEvent$: BehaviorSubject<boolean>, tick: number) {
    stopEvent$.next(true);
    timer(0, 300)
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