import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { Meta } from '@angular/platform-browser';
import { META_TAGS } from './shared/meta.tags';
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
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTags(META_TAGS);
  }
}
