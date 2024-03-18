import {
  Component,
  ElementRef,
  EnvironmentInjector,
  OnInit,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutsideClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { ENTER_LEAVE_ANIMATION_Y } from '@my-monorepo/core/ui/animations';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { BOARD_NAME } from '../../models/card.models';

@Component({
  selector: 'trello-board-name',
  templateUrl: './board-name.component.html',
  styleUrls: ['./board-name.component.scss'],
  animations: [ENTER_LEAVE_ANIMATION_Y],
  standalone: true,
  imports: [OutsideClickDirective, FormsModule, ReactiveFormsModule],
})
@CallSetValueChanges()
export class BoardNameComponent implements OnInit {
  onEdit = false;
  boardNameControl = new FormControl<string>('');
  editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');
  injector = inject(EnvironmentInjector);

  constructor(
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  ngOnInit(): void {
    const boardName = localStorage.getItem(BOARD_NAME) ?? 'Initial Board';
    this.boardNameControl.setValue(boardName);
  }

  setState(value: boolean) {
    this.onEdit = value;
  }

  saveName() {
    localStorage.setItem(BOARD_NAME, this.boardNameControl.value ?? '');
    this.setState(false);
  }

  setValueChanges() {
    effect(() => {
      this.editInput()?.nativeElement.focus();
    });

    this.outsideClickEventsService.outSideClick$$.subscribe(() => {
      if (this.onEdit) this.setState(false);
    });
  }
}
