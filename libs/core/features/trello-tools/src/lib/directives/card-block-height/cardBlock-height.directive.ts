import {
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';
import { CardFooterComponent } from '../../components/card-footer/card-footer.component';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE, FOOTER_TOP } from '../../models/card.models';

@Directive({
  selector: '[trelloCardBlockHeight]',
  exportAs: 'trelloCardBlockHeight',
})
export class CardBlockHeightDirective {
  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  @ContentChild(CardFooterComponent, { read: ElementRef }) footer?: ElementRef;
  @ContentChild('cardList') cardList?: ElementRef;

  @Input({ required: true }) id = -1;
  @Input() baseSize!: number;
  @Input('trelloCardBlockHeight') length!: number;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  @HostBinding('style.height') get cardHeight() {
    if (this.footer)
      this.footer.nativeElement.style.top = this.footerTop + 'px';

    const expandedCalcedHeight = (this.length + 1) * CARD_SIZE + this.baseSize;
    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id;
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$.value;

    if ((onCardMove && isLastHovered) || isOnAddnew)
      return expandedCalcedHeight + 'px';

    const calcedHeight = this.length * CARD_SIZE + this.baseSize;
    return calcedHeight + 'px';
  }

  get footerTop() {
    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id;
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$.value;
    const hasExpand = (onCardMove && isLastHovered) || isOnAddnew;

    const baseTop = this.length * CARD_SIZE + (hasExpand ? CARD_SIZE : 0);
    const maxTop = window.innerHeight - FOOTER_TOP;

    return Math.min(baseTop, maxTop);
  }
}
