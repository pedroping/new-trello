import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoreFeaturesBackdropScreenModule } from '@my-monorepo/core/features/backdrop-screen';
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
import { META_TAGS } from './shared/meta.tags';
@Component({
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    TuiRootModule,
    MatChipsModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiAccordionModule,
    CoreUiToolbarModule,
    MatBottomSheetModule,
    CoreFeaturesDragScrollModule,
    CoreFeaturesBackdropScreenModule,
    CoreFeaturesCustomBackgroundModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTags(META_TAGS);
  }
}
