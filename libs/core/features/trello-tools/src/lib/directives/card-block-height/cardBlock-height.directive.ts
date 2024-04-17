import { Directive, Inject, input, signal } from '@angular/core';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Subject, map, merge, startWith } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE } from '../../models/card.models';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';

@Directive({
  selector: '[trelloCardBlockHeight]',
  standalone: true,
  host: {
    '[style.height]': 'height()',
  },
})
@CallSetValueChanges()
export class CardBlockHeightDirective {
  id: number;
  addNewEvent$: BehaviorSubject<boolean>;
  length$ = new BehaviorSubject<number>(0);
  height = signal<string>('');
  baseSize = input.required<number>();
  onCardMovement$ = input.required<Subject<void>>({
    alias: 'trelloCardBlockHeight',
  });

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
        const expandedCalcedHeight =
          (this.length$.value + 1) * CARD_SIZE + this.baseSize();
        const isLastHovered =
          this.cardEventsFacadeService.lastToBeHovered === this.id;
        const onCardMove = this.cardEventsFacadeService.onCardMove;
        const isOnAddnew = this.addNewEvent$?.value;

        if ((onCardMove && isLastHovered) || isOnAddnew)
          return this.height.set(expandedCalcedHeight + 'px');

        const calcedHeight = this.length$.value * CARD_SIZE + this.baseSize();
        this.height.set(calcedHeight + 'px');
      },
    );
  }
}
