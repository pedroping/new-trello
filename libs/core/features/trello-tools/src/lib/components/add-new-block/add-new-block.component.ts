import {
  Component,
  ElementRef,
  EnvironmentInjector,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OutsideClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { ENTER_LEAVE_ANIMATION_Y } from '@my-monorepo/core/ui/animations';
import {
  OutsideClickEventsService,
  ScrollEventsService,
} from '@my-monorepo/core/utlis';
import { DisableButtonOnDragDirective } from '../../directives/disable-button-on-drag/disable-button-on-drag.directive';
@Component({
  selector: 'trello-add-new-block',
  templateUrl: './add-new-block.component.html',
  styleUrls: ['./add-new-block.component.scss'],
  animations: [ENTER_LEAVE_ANIMATION_Y],
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DisableButtonOnDragDirective,
    OutsideClickDirective,
  ],
})
@CallSetValueChanges()
export class AddNewBlockComponent {
  blocks$$ = this.dbFacadeService.allBlocks$;
  listInput = viewChild<ElementRef<HTMLInputElement>>('listNameInput');
  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(EnvironmentInjector);

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  setValueChanges() {
    effect(() => {
      if (!this.listInput()) return;
      if (!this.onAddNew) return;
      this.listInput()?.nativeElement.focus();
      this.scrollEventsService.scrollToEnd$.next();
      this.outsideClickEventsService.setStartTaking();
    });

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

    this.dbFacadeService
      .createBlock({ name: this.listName.value })
      .subscribe(() => {
        this.dbFacadeService.setAllElements();
        this.listName.reset();
        this.scrollEventsService.scrollToEnd$.next();
      });
  }
}
