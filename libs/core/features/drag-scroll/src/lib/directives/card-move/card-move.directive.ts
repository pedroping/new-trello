import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { BehaviorSubject, filter, takeUntil, timer } from 'rxjs';
import {
  BASE_SCROLL_AREA,
  BASE_SCROLL_MOVE_TICK,
  BASE_SIDENAV_SIZE,
  TICK_SPEED,
} from '../../models/values';

@Directive({
  standalone: true,
})
@CallSetValueChanges()
export class CardMoveDirective {
  @ContentChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  leftEvent$ = new BehaviorSubject<boolean>(false);
  rightEvent$ = new BehaviorSubject<boolean>(false);

  setValueChanges() {
    this.cardEventsFacadeService.objectPosition$$.subscribe((position) => {
      this.moveCard(position);
    });
  }

  @HostListener('mouseup', ['$event']) onMouseUp() {
    this.leftEvent$.next(false);
    this.rightEvent$.next(false);
  }

  moveCard(xPosition: number) {
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const onBlockMove = this.cardEventsFacadeService.onMove;

    if (!onBlockMove && !onCardMove) return;

    const hasRightSidenav = this.genericSidenavsFacadeService.rightSideNavState;
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const rightCalc = hasRightSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;
    const leftCalc = hasLeftSidenav ? BASE_SIDENAV_SIZE : BASE_SCROLL_AREA;

    if (onCardMove || onBlockMove) {
      if (window.innerWidth - rightCalc < xPosition) {
        this.startTickEvent(
          this.rightEvent$,
          BASE_SCROLL_MOVE_TICK,
          this.getHowCloseToRight(rightCalc, xPosition),
        );
        return;
      }

      if (leftCalc > xPosition) {
        this.startTickEvent(
          this.leftEvent$,
          -BASE_SCROLL_MOVE_TICK,
          this.getHowCloseToLeft(leftCalc, xPosition),
        );
        return;
      }

      this.leftEvent$.next(false);
      this.rightEvent$.next(false);
    }
  }
  getHowCloseToLeft(leftCalc: number, positon: number) {
    if (positon > leftCalc) return 0;

    const closeToBorderPercente = ((leftCalc - positon) * 100) / leftCalc;
    return +closeToBorderPercente.toFixed(2);
  }

  getHowCloseToRight(rightCalc: number, positon: number) {
    const minPosition = window.innerWidth - rightCalc;
    if (positon < minPosition) return 0;

    const closeToBorderPercente =
      ((rightCalc - (window.innerWidth - positon)) * 100) / rightCalc;
    return +closeToBorderPercente.toFixed(2);
  }

  startTickEvent(
    stopEvent$: BehaviorSubject<boolean>,
    tick: number,
    percent: number,
  ) {
    const actualEvent$ = stopEvent$.asObservable().pipe(filter((val) => !val));
    stopEvent$.next(false);
    stopEvent$.next(true);

    timer(0, TICK_SPEED)
      .pipe(takeUntil(actualEvent$))
      .subscribe(() => {
        const onCardMove = this.cardEventsFacadeService.onCardMove;
        const onBlockMove = this.cardEventsFacadeService.onMove;

        if (!onBlockMove && !onCardMove) return;

        const newTick = (tick * percent) / 100;

        this.pageContent.nativeElement.scrollLeft += newTick;
      });
  }
}
