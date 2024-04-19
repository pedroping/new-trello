import { Directive, Inject, input, signal } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Subject, map, merge, startWith } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CARD_SIZE } from '../../models/card.models';

@Directive({
  selector: '[trelloCardBlockHeight]',
  standalone: true,
  host: {
    '[style.height]': 'height()',
  },
})
@CallSetValueChanges()
export class CardBlockHeightDirective {
  id?: number;
  addNewEvent$?: BehaviorSubject<boolean>;
  length$ = new BehaviorSubject<number>(0);
  height = signal<string>('');
  baseSize = input.required<number>();
  onCardMovement$ = input.required<Subject<void>>({
    alias: 'trelloCardBlockHeight',
  });

  constructor(
    @Inject(BLOCK_TOKEN) private cardBlock: IBlockInstance,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  setValueChanges() {
    this.id = this.cardBlock.id;
    this.addNewEvent$ = this.cardBlock.block.addNewEvent$;
    merge(this.length$, this.addNewEvent$, this.onCardMovement$())
      .pipe(startWith())
      .subscribe(() => this.calcHeight());
    this.setLenght();
  }

  calcHeight() {
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
  }

  setLenght() {
    const cards$ = this.cardBlock.block.cards$;
    cards$
      .asObservable()
      .pipe(
        startWith(cards$.value),
        map((cards) => cards.length),
      )
      .subscribe((lenght) => this.length$.next(lenght));
  }
}
