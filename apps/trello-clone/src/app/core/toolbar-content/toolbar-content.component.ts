import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
@Component({
  selector: 'trello-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CdkMenuModule,
    CoreFeaturesCustomBackgroundModule,
  ],
})
export class ToolbarContentComponent implements OnInit {
 
  constructor() {}

  ngOnInit() {}
}
