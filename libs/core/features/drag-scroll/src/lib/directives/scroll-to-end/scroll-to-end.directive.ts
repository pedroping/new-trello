import { Directive, ElementRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BASE_ADD_NEW_SIZE, BASE_BLOCK_SIZE } from '../../models/values';
import { skip, switchMap, take } from 'rxjs';

@Directive({
  standalone: true,
})
@CallSetValueChanges()
export class ScrollToEndDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly dbFacadeService: DbFacadeService,
    private readonly scrollEventsService: ScrollEventsService,
  ) {}

  setValueChanges() {
    this.scrollEventsService.scrollToEnd$
      .pipe(switchMap(() => this.dbFacadeService.allBlocks$))
      .subscribe((blocks) => {
        const length = blocks.length;

        this.el.nativeElement.scroll({
          left: (length + 1) * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE,
          top: 0,
          behavior: 'smooth',
        });
      });
  }
}
