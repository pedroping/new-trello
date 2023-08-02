import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  standalone: true,
  imports: [RouterModule, MatBottomSheetModule, MatChipsModule],
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'trello-clone';
}
