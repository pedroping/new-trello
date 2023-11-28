import { Component, Input, OnInit } from '@angular/core';
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
  @Input({ required: true }) card?: Icard;
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
      this.backdropStateService.setBackDropState(null);
    });

    this.cardNameControl.valueChanges.subscribe((val) => {
      if (!this.card) return;
      this.card.name = val;
    });
  }

  addCard() {
    this.cardNameControl;
  }
}
