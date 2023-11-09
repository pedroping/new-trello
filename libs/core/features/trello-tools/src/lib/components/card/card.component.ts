import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, merge, skip } from 'rxjs';
import { Icard } from '../../models/card.models';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card?: Icard
  @Input() cards: Icard[] = [];
  @Input() isPreview?: boolean;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  private readonly outsideClickEventsService = inject(
    OutsideClickEventsService
  );
  private readonly dragAndDropService = inject(DragAndDropService);

  ngOnInit() {
    this.setValueChanges();
  }

  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!this.addNewEvent$.value || !input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;

    merge(
      this.dragAndDropService.onCardMove$,
      this.dragAndDropService.onMove$,
      outSideClick$$
    )
      .pipe(skip(2))
      .subscribe(() => {
        this.addCard();
        this.addNewEvent$.next(false);
      });
  }

  addCard() {
    if (this.cardNameControl.invalid) return;

    if (this.card) {
      this.card.name = this.cardNameControl.value;
      return;
    }

    this.cards.push({
      id: this.cards.length + 1,
      name: this.cardNameControl.value,
    });
    this.cardNameControl.reset();
    this.addNewEvent$.next(true);
  }

  editclick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.card) this.cardNameControl.setValue(this.card.name);
    this.addNewEvent$.next(true);
  }
}
