import {
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
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
  @ViewChild('listNameInput', { static: false }) set listNameInput(
    listNameInput: ElementRef
  ) {
    if (this.onAddNew) {
      listNameInput.nativeElement.focus();
      this.outsideClickEventsService.startTaking$.next();
    }
  }

  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  private readonly cardMocksService = inject(CardMocksService);
  private readonly outsideClickEventsService = inject(
    OutsideClickEventsService
  );

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
  }
}
