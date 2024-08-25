import {
  Component,
  ElementRef,
  EnvironmentInjector,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OpenCustomMenuService } from '@my-monorepo/core/features/open-custom-menu';
import {
  OutsideClickDirective,
  PreventClickDirective,
} from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  IBlock,
  Icard,
  IcardAsProperty,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import {
  CARD_ACTION_SIZE,
  CARD_ON_BOTTOM_BREAKPOINT,
} from '../../models/card.models';
import { BlockDataService } from '../../services/block-data/block-data.service';
import { MoveCardComponent } from '../move-card/move-card.component';

@Component({
  selector: 'card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MoveCardComponent,
    ReactiveFormsModule,
    PreventClickDirective,
    OutsideClickDirective,
  ],
})
@CallSetValueChanges()
@UntilDestroy()
export class CardEditComponent implements OnInit {
  blockCard: IBlock;
  card: Icard | null = null;
  domRect: DOMRect | null = null;
  contentSizes = {
    width: '',
    height: '',
  };
  menu = viewChild<TemplateRef<unknown>>('menu');
  input = viewChild<ElementRef<HTMLTextAreaElement>>('nameInput');
  injector = inject(EnvironmentInjector);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly rendere2: Renderer2,
    private readonly dbFacadeService: DbFacadeService,
    private readonly blockDataService: BlockDataService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly openCustomMenuService: OpenCustomMenuService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly backdropStateService: BackdropStateService<IcardAsProperty>,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {
    this.blockCard = this.blockDataService.block;
  }

  ngOnInit(): void {
    this.cardNameControl.setValue(this.card?.name ?? '');
    this.handleContentSizes();
  }

  openMenu(element: HTMLElement) {
    const menu = this.menu();
    if (!menu) return;
    const rect = element.getBoundingClientRect();

    this.openCustomMenuService.openMenu(
      menu,
      this.viewContainerRef,
      rect.left + rect.width + 5,
      rect.top,
    );
  }

  handleContentSizes() {
    const onRightBorder =
      this.domRect?.x &&
      this.domRect.x +
        CARD_ACTION_SIZE +
        this.elementRef.nativeElement.offsetWidth >
        window.innerWidth;

    const afterHalf =
      this.domRect?.y &&
      this.domRect?.y >= window.innerHeight - CARD_ON_BOTTOM_BREAKPOINT;

    this.rendere2[onRightBorder ? 'addClass' : 'removeClass'](
      this.elementRef.nativeElement,
      'onBorder',
    );

    this.rendere2[afterHalf ? 'addClass' : 'removeClass'](
      this.elementRef.nativeElement,
      'afterHalf',
    );

    this.contentSizes = {
      width: this.domRect?.width ? this.domRect.width + 'px' : '',
      height: this.domRect?.height ? this.domRect.height + 'px' : '',
    };
  }

  setValueChanges() {
    this.outsideClickEventsService.outSideClick$$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.backdropStateService.removeBackDrop();
      });

    effect(() => {
      this.input()?.nativeElement.focus({ preventScroll: true });
    });

    fromEvent(window, 'keyup')
      .pipe(
        untilDestroyed(this),
        filter((event) => (event as KeyboardEvent).key === 'Escape'),
      )
      .subscribe(this.closeEdit.bind(this));
  }

  closeElement() {
    this.openCustomMenuService.closeElement();
  }

  editCard() {
    if (this.cardNameControl.invalid) return;
    const card = this.card;
    if (!card) return this.closeEdit();
    card.name = this.cardNameControl.value;
    this.dbFacadeService.editCard(card);
    this.closeEdit();
  }

  closeEdit() {
    this.backdropStateService.removeBackDrop();
  }

  archive() {
    const card = this.card;
    if (!card || !card.id) return;
    this.dbFacadeService.deleteCard(card.id).subscribe(() => {
      this.dbFacadeService
        .getCardsByBlockId(this.blockCard.id)
        .subscribe((cards) => {
          this.blockCard.cards$.next(cards);
        });
      this.backdropStateService.removeBackDrop();
    });
  }

  duplicate() {
    const card = this.card;
    if (!card || !card.id) return;
    const newCard: Omit<Icard, 'id'> = {
      blockId: card.blockId,
      cardIndex: -1,
      name: `${card.name} copia`,
    };

    this.dbFacadeService.createCard(newCard).subscribe((resp) => {
      const cardWithId = { ...newCard, id: resp.id };
      const cardList = this.blockCard.cards$.value;
      const cardIndex = cardList.findIndex(
        (listCard) => listCard.id === card.id,
      );
      const indexToAdd = cardIndex === -1 ? cardList.length : cardIndex + 1;
      cardList.splice(indexToAdd, 0, cardWithId);
      this.blockCard.cards$.next(cardList);
      this.cardEventsFacadeService.validCardsOrder(
        this.blockCard.id,
        this.blockCard.id,
      );
      this.backdropStateService.removeBackDrop();
    });
  }
}
