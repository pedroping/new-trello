import { Directive, ElementRef } from '@angular/core';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BASE_ADD_NEW_SIZE, BASE_BLOCK_SIZE } from '../../models/values';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';

@Directive({
  standalone: true,
})
@CallSetValueChanges()
export class ScrollToEndDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  setValueChanges() {
    this.scrollEventsService.scrollToEnd$.subscribe(() => {
      const length = this.cardEventsFacadeService.blocks.length;
      this.el.nativeElement.parentElement.scrollLeft +=
        (length + 1) * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE;
    });
  }
}
