import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Observable, map, merge, skip } from 'rxjs';
import { Icard } from '../../models/card.models';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card?: Icard;
  @Input() cards: Icard[] = [];
  @Input() isPreview?: boolean;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  showInput$!: Observable<boolean>;
  editEvent$ = new BehaviorSubject<boolean>(false);
  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly dragAndDropService: DragAndDropService,
    private readonly backdropStateService: BackdropStateService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  ngOnInit() {
    this.setValueChanges();
  }

  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  setValueChanges() {
    this.outsideClickEvents();
    this.showInput$ = this.showInputObservable$();

    this.addNewEvent$.subscribe((val) => {
      if (!val) this.editEvent$.next(val);
    });

    this.editEvent$.subscribe((val) => {
      this.backdropStateService.setBackDropState(val);
    });
  }

  outsideClickEvents() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;
    const editClick$$ = this.outsideClickEventsService.editClick$$;

    merge(
      editClick$$,
      outSideClick$$,
      this.dragAndDropService.onMove$,
      this.dragAndDropService.onCardMove$
    )
      .pipe(skip(2))
      .subscribe(() => {
        this.addCard();
        this.addNewEvent$.next(false);
      });
  }

  showInputObservable$ = () =>
    merge(
      this.addNewEvent$.asObservable(),
      this.editEvent$.asObservable()
    ).pipe(
      map(() => {
        return this.addNewEvent$.value || this.editEvent$.value;
      })
    );

  addCard() {
    if (this.cardNameControl.invalid) return;

    if (this.editEvent$.value && this.card) {
      this.card.name = this.cardNameControl.value;
      this.editEvent$.next(false);
      return;
    }

    this.cards.push({
      id: this.cards.length + 1,
      name: this.cardNameControl.value,
    });
    this.cardNameControl.reset();
    this.addNewEvent$.next(true);
  }

  editclick() {
    this.outsideClickEventsService.editClick$.next();
    if (this.card) this.cardNameControl.setValue(this.card.name);
    this.editEvent$.next(true);
  }
}
