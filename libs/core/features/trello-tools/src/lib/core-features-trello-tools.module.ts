import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { CardBlockComponent } from './components/card-block/card-block.component';
import { CardComponent } from './components/card/card.component';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    EventPluginsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    MatIconModule,
  ],
  declarations: [CardBlockComponent, CardComponent],
  exports: [CardBlockComponent],
  providers: [],
})
export class CoreFeaturesTrelloToolsModule {}
