import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OpenCustomMenuService } from '@my-monorepo/core/features/open-custom-menu';
import {
  OutsideAddBlockClickDirective,
  PreventClickDirective,
} from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  IBlock,
  Icard,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';
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
    OutsideAddBlockClickDirective,
  ],
})
@CallSetValueChanges()
@UntilDestroy()
export class CardEditComponent implements OnInit {
  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  menu = viewChild<TemplateRef<unknown>>('menu');
  card = input<Icard>();
  blockCard = input.required<IBlock>();

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly backdropStateService: BackdropStateService,
    private readonly openCustomMenuService: OpenCustomMenuService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  ngOnInit(): void {
    const card = this.card();
    if (!card) return;
    this.cardNameControl.setValue(card.name);
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

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;

    outSideClick$$.pipe(untilDestroyed(this)).subscribe(() => {
      this.backdropStateService.setBackDropState();
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
    const card = this.card();
    if (!card) return this.closeEdit();
    card.name = this.cardNameControl.value;
    this.dbFacadeService.editCard(card);
    this.closeEdit();
  }

  closeEdit() {
    this.backdropStateService.setBackDropState();
  }

  archive() {
    const card = this.card();
    if (!card || !card.id) return;
    const cards = this.blockCard().cards$.value;
    const index = cards.findIndex((cardToFind) => cardToFind.id === card.id);
    cards.splice(index, 1);
    this.dbFacadeService.deleteCard(card.id);
    this.backdropStateService.setBackDropState();
  }
}
