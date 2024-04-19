import {
  Component,
  ElementRef,
  EnvironmentInjector,
  Inject,
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
  BLOCK_TOKEN,
  IBlock,
  IBlockInstance,
  Icard,
  IcardAsPropery,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';
import { merge, skip } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CardEditComponent } from '../card-edit/card-edit.component';

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
})
@CallSetValueChanges()
export class CardComponent {
  card = input<Icard>();
  isPreview = input<boolean>();

  blockCard: IBlock;

  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  templateRect = viewChild(BackdropContentDirective);
  onAddNew = input<boolean>(false);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(EnvironmentInjector);

  constructor(
    private readonly classInjector: Injector,
    private readonly dbFacadeService: DbFacadeService,
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly backdropStateService: BackdropStateService<IcardAsPropery>,
  ) {
    this.blockCard = cardBlock.block;
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

  addCard(onOutside?: boolean) {
    if (this.cardNameControl.invalid) return;

    const cards = this.blockCard.cards$.value;

    this.dbFacadeService
      .createCard({
        name: this.cardNameControl.value,
        blockId: this.blockCard.id,
        cardIndex: cards.length,
      })
      .subscribe(() => {
        this.dbFacadeService
          .getCardsByBlockId(this.blockCard.id)
          .subscribe((cards) => {
            this.blockCard.cards$.next(cards);
          });
        this.cardNameControl.reset();
        if (onOutside) return this.cancelEvent();
        this.blockCard.addNewEvent$.next(true);
      });
  }

  cancelEvent() {
    this.blockCard.addNewEvent$.next(false);
  }

  editclick() {
    const templateRect = this.templateRect();
    const card = this.card();
    if (!templateRect || !card) return;
    const backdropEvent: BackDropEvent<IcardAsPropery> = {
      data: { card: card },
      component: CardEditComponent,
      injector: this.getInjector(),
      domRect: templateRect.domRect,
    };
    this.outsideClickEventsService.editClick$.next();
    this.backdropStateService.setBackDropState(backdropEvent);
  }

  getInjector() {
    return Injector.create({
      providers: [
        {
          provide: BLOCK_TOKEN,
          useValue: this.cardBlock,
        },
      ],
      parent: this.classInjector,
    });
  }
}
