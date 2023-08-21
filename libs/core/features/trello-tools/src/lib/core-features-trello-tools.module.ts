import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { CardBlockComponent } from './components/card-block/card-block.component';
import { CardComponent } from './components/card/card.component';
@NgModule({
  imports: [CommonModule, EventPluginsModule],
  declarations: [CardBlockComponent, CardComponent],
  exports: [CardBlockComponent],
  providers: [],
})
export class CoreFeaturesTrelloToolsModule {}
