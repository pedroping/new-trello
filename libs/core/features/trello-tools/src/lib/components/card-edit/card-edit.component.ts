import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OpenCustomMenuService } from '@my-monorepo/core/features/open-custom-menu';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { Icard } from '../../models/card.models';

@Component({
  selector: 'card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
@CallSetValueChanges()
@UntilDestroy()
export class CardEditComponent implements OnInit {
  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  @ViewChild('menu') menu?: TemplateRef<unknown>;

  @Input({ required: true }) card?: Icard;
  @Input({ required: true }) cards: Icard[] = [];

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  blocks$$ = this.cardEventsFacadeService.blocks$$;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly backdropStateService: BackdropStateService,
    private readonly openCustomMenuService: OpenCustomMenuService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  ngOnInit(): void {
    if (!this.card) return;
    this.cardNameControl.setValue(this.card.name);
  }

  openMenu(element: HTMLElement) {
    const rect = element.getBoundingClientRect();

    this.openCustomMenuService.openMenu(
      this.menu!,
      this.viewContainerRef,
      rect.left + rect.width + 5,
      rect.top
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
        filter((event) => (event as KeyboardEvent).key === 'Escape')
      )
      .subscribe(this.closeEdit.bind(this));
  }

  closeElement() {
    this.openCustomMenuService.closeElement();
  }

  addCard() {
    if (this.cardNameControl.invalid) return;
    if (!this.card) return this.closeEdit();
    this.card.name = this.cardNameControl.value;
    this.closeEdit();
  }

  closeEdit() {
    this.backdropStateService.setBackDropState();
  }

  archive() {
    if (!this.card) return;
    const index = this.cards.findIndex((card) => card.id === this.card?.id);
    this.cards.splice(index, 1);
    this.backdropStateService.setBackDropState();
  }

  moveToBlock(cards: Icard[]) {
    if (!this.card) return;
    this.cardEventsFacadeService.moveToBlock(this.cards, cards, this.card);
    this.closeEdit();
  }
}
