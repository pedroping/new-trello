import {
  Component,
  ElementRef,
  EnvironmentInjector,
  Inject,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  BLOCK_TOKEN,
  IBlockInstance,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'card-block-edit',
  templateUrl: './card-block-edit.component.html',
  styleUrls: ['./card-block-edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CardComponent, MatIconModule],
  hostDirectives: [OutsideClickDirective],
})
@CallSetValueChanges()
export class CardBlockEditComponent {
  injector = inject(EnvironmentInjector);
  input = viewChild<ElementRef<HTMLInputElement>>('editInput');

  cardColletions: null[];
  blockName = new FormControl<string>(this.cardBlock.block.name, {
    nonNullable: true,
  });

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
    private readonly backdropStateService: BackdropStateService<unknown>,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {
    const cardLenght = cardBlock.block.cards$.value.length;
    this.cardColletions = Array.from({ length: cardLenght }).map(() => null);
  }

  setValueChanges() {
    effect(() => {
      this.input()?.nativeElement.focus();
    });

    this.outsideClickEventsService.outSideClick$$.subscribe(() =>
      this.removeBackdrop(),
    );
  }

  saveActions() {
    this.cardBlock.block.name = this.blockName.value;
    this.dbFacadeService.editBlock(this.cardBlock.block);
    this.removeBackdrop();
  }

  removeBackdrop() {
    this.backdropStateService.removeBackDrop();
  }
}
