import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { LEFT_SIDENAV_GAP } from '../../models/values';
import { DragElementsService } from '../../services/drag-elements-service/drag-elements.service';
import { CardMoveDirective } from '../card-move/card-move.directive';

@Directive({
  selector: '[dragScroll]',
  hostDirectives: [CardMoveDirective],
  standalone: true,
})
@CallSetValueChanges()
export class DragScrollDirective {
  mouseDown = false;
  startX = 0;
  scrollLeft = 0;
  @ContentChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly el: ElementRef,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
    private readonly dragElementsService: DragElementsService,
  ) {}

  @HostListener('mousedown', ['$event'])
  startDragging(e: MouseEvent) {
    const hasLeftSidenav = this.genericSidenavsFacadeService.leftSideNavState;
    const el = this.pageContent.nativeElement;
    this.mouseDown = true;
    this.startX =
      e.pageX - el.offsetLeft + (hasLeftSidenav ? LEFT_SIDENAV_GAP : 0);
    this.scrollLeft = el.scrollLeft;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  stopDragging() {
    this.scrollEventsService.onMouseDown$.next(false);
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  moveEvent(e: MouseEvent) {
    const el = this.el.nativeElement;
    const hasPrevent = this.dragElementsService.hasPreventElement(
      e.target as HTMLElement,
    );

    if (hasPrevent) return;

    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const onBlockMove = this.cardEventsFacadeService.onMove;

    if (!this.mouseDown || onBlockMove || onCardMove) return;

    const xPosition = e.pageX - el.offsetLeft;
    const scroll = xPosition - this.startX;
    this.pageContent.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }
}
