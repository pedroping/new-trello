import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  Injector,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  BackDropEvent,
  BackdropContentDirective,
  BackdropStateService,
} from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  IBlock,
  Icard,
  IcardAsProperty,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';
import { merge, skip, switchMap } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { BlockDataService } from '../../services/block-data/block-data.service';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { CARD_SIZE } from '../../models/card.models';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    CardEditComponent,
    ReactiveFormsModule,
    OutsideClickDirective,
    BackdropContentDirective,
  ],
  host: {
    '[class.onPreview]': 'isPreview()',
  },
})
@CallSetValueChanges()
export class CardComponent implements AfterViewInit {
  card = input<Icard>();
  isPreview = input<boolean>();
  blockCard: IBlock;
  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  onAddNew = input<boolean>(false);
  injector = inject(EnvironmentInjector);
  templateRect = viewChild(BackdropContentDirective);
  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  cardHeight = CARD_SIZE;

  constructor(
    private readonly classInjector: Injector,
    private readonly dbFacadeService: DbFacadeService,
    private readonly blockDataService: BlockDataService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly backdropStateService: BackdropStateService<IcardAsProperty>,
  ) {
    this.blockCard = this.blockDataService.block;
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  setValueChanges() {
    effect(() => {
      this.nameInput()?.nativeElement.focus({ preventScroll: true });
    });

    if (this.isPreview()) return;
    this.outsideClickEvents();
  }

  outsideClickEvents() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;
    const editClick$$ = this.outsideClickEventsService.editClick$$;

    merge(
      editClick$$,
      outSideClick$$,
      this.cardEventsFacadeService.onMove$$,
      this.cardEventsFacadeService.onCardMove$$,
    )
      .pipe(skip(2))
      .subscribe(() => {
        this.addCard(true);
        this.cancelEvent();
      });
  }

  setHeight() {
    this.cardHeight = this.elementRef.nativeElement.offsetHeight;
  }

  addCard(onOutside?: boolean) {
    if (this.cardNameControl.invalid) return;

    const cards = this.blockCard.cards$.value;
    const newCard = {
      name: this.cardNameControl.value,
      blockId: this.blockCard.id,
      cardIndex: cards.length,
    };

    this.dbFacadeService
      .createCard(newCard)
      .pipe(
        switchMap(() =>
          this.dbFacadeService
            .getCardsByBlockId(this.blockCard.id)
            .pipe(skip(1)),
        ),
      )
      .subscribe((dbCards) => {
        this.blockCard.cards$.next(dbCards);
        this.cardNameControl.reset();
        if (onOutside) return this.cancelEvent();
        this.blockCard.addNewEvent$.next(true);
        this.setHeight();
      });
  }

  cancelEvent() {
    this.blockCard.addNewEvent$.next(false);
  }

  editclick() {
    const templateRect = this.templateRect();
    const card = this.card();
    if (!templateRect || !card) return;

    const backdropEvent: BackDropEvent<IcardAsProperty & { domRect: DOMRect }> =
      {
        data: { card: card, domRect: templateRect.domRect },
        component: CardEditComponent,
        injector: this.getInjector(),
        domRect: templateRect.domRect,
      };
    this.outsideClickEventsService.setEditClick();
    this.backdropStateService.setBackDropState(backdropEvent);

    this.backdropStateService.backDropEventSubscription$.subscribe((value) => {
      if (!value) this.setHeight();
    });
  }

  getInjector() {
    return Injector.create({
      providers: [
        {
          provide: BlockDataService,
          useValue: this.blockDataService,
        },
      ],
      parent: this.classInjector,
    });
  }
}
