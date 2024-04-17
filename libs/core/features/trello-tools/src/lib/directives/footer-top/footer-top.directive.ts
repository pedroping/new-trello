import { Directive, Inject, input, signal } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Subject, map, merge, startWith } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE, FOOTER_TOP } from '../../models/card.models';

@Directive({
  selector: '[trelloFooterTop]',
  standalone: true,
  host: {
    '[style.top]': 'top()',
    style: 'transition: top 100ms ease-in-out',
  },
})
@CallSetValueChanges()
export class FooterTopDirective {
  id: number;
  length$ = new BehaviorSubject<number>(0);
  addNewEvent$: BehaviorSubject<boolean>;
  onCardMovement$ = input.required<Subject<void>>();
  top = signal<string>('');

  constructor(
    @Inject(BLOCK_TOKEN) cardBlock: IBlockInstance,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.id = cardBlock.id();
    this.addNewEvent$ = cardBlock.block().addNewEvent$;
    cardBlock
      .block()
      .cards$.asObservable()
      .pipe(
        startWith(cardBlock.block().cards$.value),
        map((cards) => cards.length),
      )
      .subscribe((length) => this.length$.next(length));
  }

  setValueChanges() {
    merge(this.length$, this.addNewEvent$, this.onCardMovement$()).subscribe(
      () => {
        const isLastHovered =
          this.cardEventsFacadeService.lastToBeHovered === this.id;
        const onCardMove = this.cardEventsFacadeService.onCardMove;
        const isOnAddnew = this.addNewEvent$.value;
        const hasExpand = (onCardMove && isLastHovered) || isOnAddnew;
        const baseTop =
          this.length$.value * CARD_SIZE + (hasExpand ? CARD_SIZE : 0);
        const maxTop = window.innerHeight - FOOTER_TOP;

        this.top.set(Math.min(baseTop, maxTop) + 'px');
      },
    );
  }
}
