import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from 'libs/ui/src/lib/ui.module';
@Component({
  standalone: true,
  imports: [RouterModule, UiModule],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'default-app';
}
