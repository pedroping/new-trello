import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table';
import { DialogModule } from '@angular/cdk/dialog';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreUiDynamicTableModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    DialogModule,
  ],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'default-app';
}

// npx nx generate @nrwl/angular:library --name=expand-table  --directory=core/features
