import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BackdropScreenComponent } from '@my-monorepo/core/features/backdrop-screen';
import { CustomBackgroundDirective } from '@my-monorepo/core/features/custom-background';
import { environment } from '../environments/environment';

@Component({
  selector: 'new-trello-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, BackdropScreenComponent, CustomBackgroundDirective],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit() {
    if (environment.isWebComponent) this.router.navigateByUrl('/');
  }
}
