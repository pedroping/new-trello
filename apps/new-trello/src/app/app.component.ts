import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackdropScreenComponent } from '@my-monorepo/core/features/backdrop-screen';
import { CustomBackgroundDirective } from '@my-monorepo/core/features/custom-background';

@Component({
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, BackdropScreenComponent, CustomBackgroundDirective],
})
export class AppComponent {}
