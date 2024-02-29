import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { ENTER_LEAVE_ANIMATION } from '@my-monorepo/core/ui/animations';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
@Component({
  selector: 'trello-add-new-block',
  templateUrl: './add-new-block.component.html',
  styleUrls: ['./add-new-block.component.scss'],
  animations: [ENTER_LEAVE_ANIMATION],
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, FormsModule],
})
@CallSetValueChanges()
export class AddNewBlockComponent {
  @ViewChild('listNameInput', { static: false }) set listInput(
    listNameInput: ElementRef
  ) {
    if (!listNameInput) return;
    this.listNameInput = listNameInput;

    if (!this.onAddNew) return;
    listNameInput.nativeElement.focus();
    this.outsideClickEventsService.startTaking$.next();
  }

  onAddNew = false;
  listNameInput?: ElementRef;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
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

    this.cardEventsFacadeService.addNew(listName);
    this.listName.reset();
    this.listNameInput && this.listNameInput.nativeElement.focus();
  }
}
