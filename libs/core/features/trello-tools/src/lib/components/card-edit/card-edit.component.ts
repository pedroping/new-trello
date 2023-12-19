import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { Icard } from '../../models/card.models';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
@CallSetValueChanges()
export class CardEditComponent implements OnInit {
  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  @ViewChild('menuTemplate') set template(a: any) {
    console.log('Teste', a?.nativeElement?.parentElement?.parentElement);
  }

  @Input({ required: true }) card?: Icard;
  @Input({ required: true }) cards: Icard[] = [];

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly backdropStateService: BackdropStateService
  ) {}

  ngOnInit(): void {
    if (!this.card) return;
    this.cardNameControl.setValue(this.card.name);
  }

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;

    outSideClick$$.subscribe(() => {
      this.backdropStateService.setBackDropState();
    });
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
}
