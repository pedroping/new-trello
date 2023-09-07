import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { CardBlockComponent } from './components/card-block/card-block.component';
import { CardComponent } from './components/card/card.component';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { CardBlockHeightDirective } from './directives/cardBlock-height.directive';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CardOptionsComponent } from './components/card-options/card-options.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';
@NgModule({
  imports: [
    CommonModule,
    EventPluginsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    CdkMenuModule,
  ],
  declarations: [
    CardBlockComponent,
    CardComponent,
    CardBlockHeightDirective,
    CardOptionsComponent,
    CardHeaderComponent,
    CardFooterComponent,
  ],
  exports: [CardBlockComponent],
  providers: [CardBlockHeightDirective],
})
export class CoreFeaturesTrelloToolsModule {}
