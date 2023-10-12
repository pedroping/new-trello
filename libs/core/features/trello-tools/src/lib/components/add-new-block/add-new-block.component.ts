import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CardMocksService } from '../../services/card-mocks/card-mocks.service';
import { timer } from 'rxjs';
import { ENTER_ANIMATION } from '@my-monorepo/core/ui/animations';
@Component({
  selector: 'trello-add-new-block',
  templateUrl: './add-new-block.component.html',
  styleUrls: ['./add-new-block.component.scss'],
  animations: [ENTER_ANIMATION],
})
export class AddNewBlockComponent {
  @ViewChild('listNameInput', { static: false })
  listNameInput?: ElementRef;

  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  private readonly cardMocksService = inject(CardMocksService);

  setState(value: boolean) {
    this.onAddNew = value;
    timer(100).subscribe(() => {
      if (value && this.listNameInput) this.listNameInput.nativeElement.focus();
    });
  }

  addList() {
    const listName = this.listName.value;
    if (!listName) return;

    this.cardMocksService.addNew(listName);
    this.setState(false);
    this.listName.reset();
  }
}
