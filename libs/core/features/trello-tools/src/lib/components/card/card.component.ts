import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, merge, skip } from 'rxjs';
import { Icard } from '../../models/card.models';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
@CallSetValueChanges()
export class CardComponent {
  @ViewChild('editTemplate') editTemplate!: TemplateRef<unknown>;

  @Input() card?: Icard;
  @Input() cards: Icard[] = [];
  @Input() isPreview?: boolean;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly backdropStateService: BackdropStateService,
    private readonly elementRef: ElementRef,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  setValueChanges() {
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

    this.cards.push({
      id: this.cards.length + 1,
      name: this.cardNameControl.value,
    });
    this.cardNameControl.reset();
    this.addNewEvent$.next(true);
  }

  cancelEvent() {
    this.cardNameControl.reset();
    this.addNewEvent$.next(false);
  }

  editclick() {
    this.outsideClickEventsService.editClick$.next();
    const domRect = this.elementRef.nativeElement.getBoundingClientRect();
    const template = this.editTemplate;

    this.backdropStateService.setBackDropState({ domRect, template });
  }
}
