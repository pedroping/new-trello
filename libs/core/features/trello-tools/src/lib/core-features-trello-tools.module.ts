import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CoreFeaturesOutsideElementClickModule } from '@my-monorepo/core/features/outside-element-click';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { AddNewBlockComponent } from './components/add-new-block/add-new-block.component';
import { CardBlockComponent } from './components/card-block/card-block.component';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardOptionsComponent } from './components/card-options/card-options.component';
import { CardComponent } from './components/card/card.component';
import { CardBlockHeightDirective } from './directives/card-block-height/cardBlock-height.directive';
import { CloseMenuDirective } from './directives/close-menu/close-menu.directive';
import { ScrollToEndDirective } from './directives/scroll-to-end/scroll-to-end.directive';
@NgModule({
  imports: [
    CdkDrag,
    FormsModule,
    CdkDropList,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    CdkMenuModule,
    DragDropModule,
    EventPluginsModule,
    ReactiveFormsModule,
    CoreFeaturesOutsideElementClickModule,
  ],
  declarations: [
    CardComponent,
    CardListComponent,
    CardEditComponent,
    CloseMenuDirective,
    CardBlockComponent,
    CardHeaderComponent,
    CardFooterComponent,
    AddNewBlockComponent,
    CardOptionsComponent,
    ScrollToEndDirective,
    CardBlockHeightDirective,
  ],
  exports: [CardBlockComponent, AddNewBlockComponent, CloseMenuDirective],
  providers: [CardBlockHeightDirective],
})
export class CoreFeaturesTrelloToolsModule {}
