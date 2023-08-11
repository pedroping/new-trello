import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'default-app';
}

// npx nx generate @nrwl/angular:library --name=expand-table  --directory=core/features
// npm install @angular/pwa --save-dev
// nx g @angular/pwa:ng-add --project *project-name*
// npx nx g @angular/material:ng-add --project=trello-clone
