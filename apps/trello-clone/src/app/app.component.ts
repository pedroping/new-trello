import { Component } from '@angular/core';
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
    CoreUiToolbarModule
  ],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'trello-clone';
}
