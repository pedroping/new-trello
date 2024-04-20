import { Component, Inject } from '@angular/core';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';

@Component({
  selector: 'card-block-edit',
  templateUrl: './card-block-edit.component.html',
  styleUrls: ['./card-block-edit.component.scss'],
  standalone: true,
})
export class CardBlockEditComponent {
  constructor(
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
  ) {}
}
