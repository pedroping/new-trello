import {
  Component,
  ElementRef,
  EnvironmentInjector,
  effect,
  runInInjectionContext,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OutsideAddBlockClickDirective } from '@my-monorepo/core/features/outside-element-click';
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
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    OutsideAddBlockClickDirective,
  ],
})
@CallSetValueChanges()
export class AddNewBlockComponent {
  listInput = viewChild<ElementRef>('listNameInput');
  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private injector: EnvironmentInjector,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  setValueChanges() {
    runInInjectionContext(this.injector, () =>
      effect(() => {
        if (!this.listInput()) return;
        if (!this.onAddNew) return;
        this.listInput()?.nativeElement.focus();
        this.outsideClickEventsService.startTaking$.next();
      }),
    );

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
    this.listInput()?.nativeElement.focus();
  }
}
