import { Component, OnInit } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';

@Component({
  selector: 'card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
export class CardEditComponent implements OnInit {
  constructor(
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly backdropStateService: BackdropStateService
  ) {}

  ngOnInit(): void {
    this.setValueChanges();
  }

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;

    outSideClick$$.subscribe(() => {
      this.backdropStateService.setBackDropState(null)
    });
  }
}
