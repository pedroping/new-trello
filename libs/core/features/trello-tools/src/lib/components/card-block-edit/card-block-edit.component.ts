import {
  Component,
  ElementRef,
  EnvironmentInjector,
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
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { BlockDataService } from '../../services/block-data/block-data.service';
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
  blockName = new FormControl<string>(this.blockDataService.block.name, {
    nonNullable: true,
  });

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly blockDataService: BlockDataService,
    private readonly backdropStateService: BackdropStateService<unknown>,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {
    const cardLenght = this.blockDataService.block.cards$.value.length;
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
    this.blockDataService.block.name = this.blockName.value;
    this.dbFacadeService.editBlock(this.blockDataService.block);
    this.removeBackdrop();
  }

  removeBackdrop() {
    this.backdropStateService.removeBackDrop();
  }
}
