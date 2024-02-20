import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { DarkModeToggleDirective } from '@my-monorepo/core/features/dark-mode';
import { CoreFeaturesOutsideElementClickModule } from '@my-monorepo/core/features/outside-element-click';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CoreFeaturesTrelloToolsModule } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';

@Component({
  selector: 'trello-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    CdkMenuModule,
    MatButtonModule,
    DarkModeToggleDirective,
    CoreFeaturesTrelloToolsModule,
    CoreFeaturesCustomBackgroundModule,
    CoreFeaturesOutsideElementClickModule,
  ],
})
@CallSetValueChanges()
export class ToolbarContentComponent {
  @ViewChild(CdkMenuTrigger) menuTrigger?: CdkMenuTrigger;

  constructor(
    private readonly outsideClickEventsService: OutsideClickEventsService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  setValueChanges() {
    this.outsideClickEventsService.outSideClick$.subscribe(() =>
      this.menuTrigger?.close()
    );
  }

  toggleRightSideNav() {
    this.genericSidenavsFacadeService.setRightSideNavState(
      !this.genericSidenavsFacadeService.rightSideNavState
    );
  }
}
