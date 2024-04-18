import { Directive, ElementRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { startWith, switchMap } from 'rxjs';
import { BASE_ADD_NEW_SIZE, BASE_BLOCK_SIZE } from '../../models/values';

@Directive({
  standalone: true,
})
@CallSetValueChanges()
export class ScrollToEndDirective {
  lasIndex = 0;

  constructor(
    private readonly el: ElementRef,
    private readonly dbFacadeService: DbFacadeService,
    private readonly scrollEventsService: ScrollEventsService,
  ) {}

  setValueChanges() {
    this.scrollEventsService.scrollToEnd$
      .pipe(
        switchMap(() => this.dbFacadeService.allBlocks$),
        startWith(this.dbFacadeService.allBlocks$.value),
      )
      .subscribe((blocks) => {
        const length = blocks.length;

        if (this.lasIndex < +length)
          this.el.nativeElement.parentElement.scroll({
            left: (length + 1) * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE,
            top: 0,
            behavior: 'smooth',
          });

        this.lasIndex = length;
      });
  }
}
