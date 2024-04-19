import { AsyncPipe } from '@angular/common';
import {
  Component,
  Injector,
  OnInit,
  ViewContainerRef,
  input,
  viewChild,
} from '@angular/core';
import { BLOCK_TOKEN, IBlock, IBlockInstance } from '@my-monorepo/core/utlis';
import { CardBlockHeightDirective } from '../../directives/card-block-height/cardBlock-height.directive';
import { CardBlockContentComponent } from '../card-block-content/card-block-content.component';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
  standalone: true,
  imports: [
    CardBlockHeightDirective,
    CardFooterComponent,
    CardHeaderComponent,
    CardListComponent,
    AsyncPipe,
  ],
})
export class CardBlockComponent implements OnInit {
  id = input.required<number>();
  block = input.required<IBlock>();
  isPreview = input<boolean>(false);
  viewContainerRef = viewChild('vcr', { read: ViewContainerRef });

  constructor(private readonly injector: Injector) {}

  ngOnInit(): void {
    const viewContainerRef = this.viewContainerRef();
    if (!viewContainerRef) return;
    this.createContent(viewContainerRef);
  }

  createContent(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();

    const { instance } = viewContainerRef.createComponent(
      CardBlockContentComponent,
      {
        injector: this.getInjector(),
      },
    );
    instance.isPreview = this.isPreview();
  }

  getInjector() {
    const blockInstance: IBlockInstance = {
      id: this.id(),
      block: this.block(),
    };

    return Injector.create({
      providers: [
        {
          provide: BLOCK_TOKEN,
          useValue: blockInstance,
        },
      ],
      parent: this.injector,
    });
  }
}
