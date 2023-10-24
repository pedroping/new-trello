import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject, 
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, filter, merge, skip } from 'rxjs';
import { Icard } from '../../models/card.models';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
  @ViewChild('nameInput', { static: false })
  input?: ElementRef<HTMLInputElement>;
  @Input() isPreview?: boolean;
  @Input() cards: Icard[] = [];
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

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;
    this.addNewEvent$.pipe(filter((val) => !!val)).subscribe(() => {
      this.input?.nativeElement.focus({ preventScroll: true });
    });

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

  ngAfterViewInit(): void {
    this.input?.nativeElement.focus({ preventScroll: true });
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
}
