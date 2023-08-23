import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoreFeaturesTrelloToolsModule } from '@my-monorepo/core/features/trello-tools';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, CoreFeaturesTrelloToolsModule, DragDropModule],
})
export class HomePageComponent {}
