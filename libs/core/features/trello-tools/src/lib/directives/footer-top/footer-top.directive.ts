import { Directive, HostBinding, input } from '@angular/core';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE, FOOTER_TOP } from '../../models/card.models';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[trelloFooterTop]',
  standalone: true,
})
export class FooterTopDirective {
  id = input<number>(-1);
  length = input<number>(0);
  addNewEvent$ = input<BehaviorSubject<boolean>>();

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  @HostBinding('style.top') get footerTop() {
    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id();
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$()?.value;
    const hasExpand = (onCardMove && isLastHovered) || isOnAddnew;

    const baseTop = this.length() * CARD_SIZE + (hasExpand ? CARD_SIZE : 0);
    const maxTop = window.innerHeight - FOOTER_TOP;

    return Math.min(baseTop, maxTop) + 'px';
  }
}
