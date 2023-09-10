import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [DragDropModule, RouterModule, CoreUiToolbarModule],
})
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
