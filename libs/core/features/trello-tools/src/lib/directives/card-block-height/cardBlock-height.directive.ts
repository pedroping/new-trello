import {
  Directive,
  ElementRef,
  HostBinding,
  contentChild,
  input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardFooterComponent } from '../../components/card-footer/card-footer.component';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE, FOOTER_TOP } from '../../models/card.models';

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
  footer = contentChild(CardFooterComponent, { read: ElementRef });
  length = input.required<number>({ alias: 'trelloCardBlockHeight' });

  @HostBinding('style.height') get cardHeight() {
    if (this.footer())
      this.footer()!.nativeElement.style.top = this.footerTop + 'px';

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

  get footerTop() {
    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id();
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$()?.value;
    const hasExpand = (onCardMove && isLastHovered) || isOnAddnew;

    const baseTop = this.length() * CARD_SIZE + (hasExpand ? CARD_SIZE : 0);
    const maxTop = window.innerHeight - FOOTER_TOP;

    return Math.min(baseTop, maxTop);
  }
}
