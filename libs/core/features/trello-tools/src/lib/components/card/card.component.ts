import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
  @ViewChild('nameInput', { static: false })
  input?: ElementRef<HTMLInputElement>;
  @Input() isPreview?: boolean;
  @Input() cards: number[] = [];
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnInit() {
    this.setValueChanges();
  }

  setValueChanges() {
    this.addNewEvent$.pipe(filter((val) => !!val)).subscribe(() => {
      this.input?.nativeElement.focus({ preventScroll: true });
    });
  }

  ngAfterViewInit(): void {
    this.input?.nativeElement.focus({ preventScroll: true });
  }

  addCard() {
    if (this.cardNameControl.invalid) return;
    this.cards.push(this.cards.length + 1);
    this.cardNameControl.reset();
    this.addNewEvent$.next(true)
  }
}
