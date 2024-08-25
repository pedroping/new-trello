import { Directive, ElementRef, input } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BehaviorSubject, Subject, merge, startWith } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { BlockDataService } from '../../services/block-data/block-data.service';

@Directive({
  selector: '[trelloCardBlockHeight]',
  standalone: true,
})
@CallSetValueChanges()
export class CardBlockHeightDirective {
  id?: number;
  addNewEvent$?: BehaviorSubject<boolean>;
  baseSize = input.required<number>();
  onCardMovement$ = input.required<Subject<void>>({
    alias: 'trelloCardBlockHeight',
  });

  constructor(
    private readonly blockDataService: BlockDataService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  setValueChanges() {
    this.id = this.blockDataService.id;
    this.addNewEvent$ = this.blockDataService.block.addNewEvent$;
    merge(
      this.blockDataService.cardsHeight$$,
      this.addNewEvent$,
      this.onCardMovement$(),
    )
      .pipe(startWith())
      .subscribe(() => this.calcHeight());
  }

  calcHeight() {
    const expandedCalcedHeight =
      this.blockDataService.cardsHeight +
      (this.cardEventsFacadeService.cardHeight ?? 0) +
      this.baseSize();

    const isLastHovered =
      this.cardEventsFacadeService.lastToBeHovered === this.id;
    const onCardMove = this.cardEventsFacadeService.onCardMove;
    const isOnAddnew = this.addNewEvent$?.value;

    if ((onCardMove && isLastHovered) || isOnAddnew) {
      this.elementRef.nativeElement.style.height = expandedCalcedHeight + 'px';
      return;
    }

    const calcedHeight = this.blockDataService.cardsHeight + this.baseSize();

    this.elementRef.nativeElement.style.height = calcedHeight + 'px';
  }
}
