import { Directive, HostBinding, input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE } from '../../models/card.models';

@Directive({
  selector: '[trelloCardBlockHeight]',
  exportAs: 'trelloCardBlockHeight',
  standalone: true,
})
export class CardBlockHeightDirective {
  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  id = input<number>(-1);
  baseSize = input.required<number>();
  addNewEvent$ = input<BehaviorSubject<boolean>>();
  length = input.required<number>({ alias: 'trelloCardBlockHeight' });

  @HostBinding('style.height') get cardHeight() {
    const expandedCalcedHeight =
      (this.length() + 1) * CARD_SIZE + this.baseSize();
    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id();
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$()?.value;

    if ((onCardMove && isLastHovered) || isOnAddnew)
      return expandedCalcedHeight + 'px';

    const calcedHeight = this.length() * CARD_SIZE + this.baseSize();
    return calcedHeight + 'px';
  }
}
