import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { AddNewBlockComponent } from './components/add-new-block/add-new-block.component';
import { CardBlockComponent } from './components/card-block/card-block.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardOptionsComponent } from './components/card-options/card-options.component';
import { CardComponent } from './components/card/card.component';
import { CardBlockHeightDirective } from './directives/card-block-height/cardBlock-height.directive';
import { OutsideAddBlockClickDirective } from './directives/outside-add-block-click/outside-add-block-click.directive';
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
    CardListComponent,
    AddNewBlockComponent,
    OutsideAddBlockClickDirective
  ],
  exports: [CardBlockComponent, AddNewBlockComponent],
  providers: [CardBlockHeightDirective, OutsideAddBlockClickDirective],
})
export class CoreFeaturesTrelloToolsModule {}
