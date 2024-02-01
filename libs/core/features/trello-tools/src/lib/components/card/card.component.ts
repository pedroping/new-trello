import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  BackdropContentDirective,
  BackdropStateService,
} from '@my-monorepo/core/features/backdrop-screen';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { merge, skip } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { IBlock, Icard } from '../../models/card.models';
import { BackDropEvent } from 'libs/core/features/backdrop-screen/src/lib/models/backdrop-screen-models';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
@CallSetValueChanges()
export class CardComponent {
  @ViewChild(BackdropContentDirective) editTemplate!: BackDropEvent;

  @Input() card?: Icard;
  @Input() isPreview?: boolean;

  @Input() onAddNew = false;
  @Input() blockCard!: IBlock;

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly backdropStateService: BackdropStateService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  setValueChanges() {
    if (this.isPreview) return;
    this.outsideClickEvents();
  }

  outsideClickEvents() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;
    const editClick$$ = this.outsideClickEventsService.editClick$$;

    merge(
      editClick$$,
      outSideClick$$,
      this.cardEventsFacadeService.onMove$$,
      this.cardEventsFacadeService.onCardMove$$
    )
      .pipe(skip(2))
      .subscribe(() => {
        this.addCard();
        this.cancelEvent();
      });
  }

  addCard() {
    if (this.cardNameControl.invalid) return;

    this.blockCard.cards.push({
      id: this.blockCard.cards.length + 1,
      name: this.cardNameControl.value,
    });
    this.cardNameControl.reset();
    this.blockCard.addNewEvent$.next(true);
  }

  cancelEvent() {
    this.cardNameControl.reset();
    this.blockCard.addNewEvent$.next(false);
  }

  editclick() {
    this.outsideClickEventsService.editClick$.next();
    this.backdropStateService.setBackDropState(this.editTemplate);
  }
}
