import { Directive, ElementRef } from '@angular/core';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { ScrollEventsService } from '@my-monorepo/core/utlis';

@Directive({
  standalone: true,
})
export class CardMoveDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {
    console.log(el);
  }
}
