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
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { ENTER_LEAVE_ANIMATION } from '@my-monorepo/core/ui/animations';
import {
  OutsideClickEventsService,
  ScrollEventsService,
} from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';
import { Icard } from '@my-monorepo/core/utlis';
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
  blocks$$ = this.dbFacadeService.allBlocks$;
  listInput = viewChild<ElementRef<HTMLInputElement>>('listNameInput');
  onAddNew = false;
  listName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private injector: EnvironmentInjector,
    private readonly dbFacadeService: DbFacadeService,
    private readonly scrollEventsService: ScrollEventsService,
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
    const cards = this.blocks$$.value;

    this.dbFacadeService
      .createBlock({ name: this.listName.value })
      .subscribe((resp) => {
        cards.push({
          id: resp.id,
          name: this.listName.value,
          addNewEvent$: new BehaviorSubject<boolean>(false),
          cards$: new BehaviorSubject<Icard[]>([]),
        });
        this.blocks$$.next(cards);
        this.listName.reset();
        this.scrollEventsService.scrollToEnd$.next();
      });
  }
}
