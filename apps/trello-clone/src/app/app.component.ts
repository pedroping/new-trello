import { Component, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatBottomSheetModule,
    MatChipsModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiRootModule,
    TuiAccordionModule,
    CoreUiToolbarModule,
    CoreFeaturesDragScrollModule,
    CoreFeaturesCustomBackgroundModule,
  ],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {}
