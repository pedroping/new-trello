import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreUiDynamicTableModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'default-app';
}

// npx nx generate @nrwl/angular:library --name=expand-table  --directory=core/features
