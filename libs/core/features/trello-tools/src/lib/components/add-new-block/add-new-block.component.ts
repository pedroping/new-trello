import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { ENTER_LEAVE_ANIMATION } from '@my-monorepo/core/ui/animations';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { CardMocksService } from '../../services/card-mocks/card-mocks.service';
@Component({
  selector: 'trello-add-new-block',
  templateUrl: './add-new-block.component.html',
  styleUrls: ['./add-new-block.component.scss'],
  animations: [ENTER_LEAVE_ANIMATION],
})
@CallSetValueChanges()
export class AddNewBlockComponent {
  @ViewChild('listNameInput', { static: false }) set listInput(
    listNameInput: ElementRef
  ) {
    if (!listNameInput) return;
    this.listNameInput = listNameInput;
    if (this.onAddNew) {
      listNameInput.nativeElement.focus();
      this.outsideClickEventsService.startTaking$.next();
    }
  }

  onAddNew = false;
  listNameInput?: ElementRef;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly cardMocksService: CardMocksService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  setValueChanges() {
    this.outsideClickEventsService.outSideClick$$.subscribe(() => {
      if (this.onAddNew) this.setState(false);
    });
  }

  setState(value: boolean) {
    this.onAddNew = value;
  }

  addList() {
    const listName = this.listName.value;
    if (!listName) return;

    this.cardMocksService.addNew(listName);
    this.listName.reset();
    this.listNameInput && this.listNameInput.nativeElement.focus();
  }
}
