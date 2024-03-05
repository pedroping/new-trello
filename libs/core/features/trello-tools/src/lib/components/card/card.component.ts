import {
  Component,
  ElementRef,
  EnvironmentInjector,
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
import { OutsideAddBlockClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { merge, skip } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { IBlock, Icard } from '../../models/card.models';
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
    BackdropContentDirective,
    OutsideAddBlockClickDirective,
  ],
})
@CallSetValueChanges()
export class CardComponent {
  card = input<Icard>();
  isPreview = input<boolean>();
  onAddNew = input<boolean>(false);
  blockCard = input.required<IBlock>();
  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  editTemplate = viewChild<BackDropEvent>(BackdropContentDirective);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(EnvironmentInjector);

  constructor(
    private readonly backdropStateService: BackdropStateService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

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
        this.addCard();
        this.cancelEvent();
      });
  }

  addCard() {
    if (this.cardNameControl.invalid) return;

    this.blockCard().cards.push({
      id: this.blockCard().cards.length + 1,
      name: this.cardNameControl.value,
    });
    this.cardNameControl.reset();
    this.blockCard().addNewEvent$.next(true);
  }

  cancelEvent() {
    this.cardNameControl.reset();
    this.blockCard().addNewEvent$.next(false);
  }

  editclick() {
    this.outsideClickEventsService.editClick$.next();
    this.backdropStateService.setBackDropState(this.editTemplate());
  }
}
