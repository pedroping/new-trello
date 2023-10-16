import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { ENTER_LEAVE_ANIMATION } from '@my-monorepo/core/ui/animations';
import { take, timer } from 'rxjs';
import { CardMocksService } from '../../services/card-mocks/card-mocks.service';
@Component({
  selector: 'trello-add-new-block',
  templateUrl: './add-new-block.component.html',
  styleUrls: ['./add-new-block.component.scss'],
  animations: [ENTER_LEAVE_ANIMATION],
})
export class AddNewBlockComponent implements OnInit {
  @ViewChild('listNameInput', { static: false })
  listNameInput?: ElementRef;

  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  private readonly cardMocksService = inject(CardMocksService);
  private readonly outsideClickEventsService = inject(
    OutsideClickEventsService
  );

  ngOnInit(): void {
    this.outsideClickEventsService.outSideClick$$.subscribe(() => {
      if (this.onAddNew) this.setState(false);
    });
  }

  setState(value: boolean) {
    this.onAddNew = value;
    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        if (!value) this.outsideClickEventsService.stopTaking$.next();
        if (value && this.listNameInput)
          this.listNameInput.nativeElement.focus();
        this.outsideClickEventsService.startTaking$.next();
      });
  }

  addList() {
    const listName = this.listName.value;
    if (!listName) return;

    this.cardMocksService.addNew(listName);
    this.listName.reset();
  }
}
