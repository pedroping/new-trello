import { Component, Inject } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { OutsideClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import {
  BLOCK_TOKEN,
  IBlockInstance,
  OutsideClickEventsService,
} from '@my-monorepo/core/utlis';

@Component({
  selector: 'card-block-edit',
  templateUrl: './card-block-edit.component.html',
  styleUrls: ['./card-block-edit.component.scss'],
  standalone: true,
  hostDirectives: [OutsideClickDirective],
})
@CallSetValueChanges()
export class CardBlockEditComponent {
  constructor(
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
    private readonly backdropStateService: BackdropStateService<unknown>,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  setValueChanges() {
    this.outsideClickEventsService.outSideClick$$.subscribe(() =>
      this.backdropStateService.removeBackDrop(),
    );
  }
}
