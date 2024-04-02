import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';

@Component({
  selector: 'trello-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class CardOptionsComponent {
  cdkTrigger = input.required<CdkMenuTrigger>();
  listId = input<number>(-1);

  constructor(private readonly dbFacadeService: DbFacadeService) {}

  closeMenu() {
    this.cdkTrigger().close();
  }

  archiveList() {
    this.dbFacadeService.deleteBlock(this.listId()).subscribe(() => {
      this.dbFacadeService.setAllElements();
    });
    this.closeMenu();
  }
}
