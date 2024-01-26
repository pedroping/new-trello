import { Directive, ElementRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '@my-monorepo/core/features/trello-tools';
import { startWith } from 'rxjs';
import { BASE_ADD_NEW_SIZE, BASE_BLOCK_SIZE } from '../../models/values';
import { ScrollToEndDirective } from '../scroll-to-end/scroll-to-end.directive';

@Directive({
  selector: '[pageWidth]',
  hostDirectives: [ScrollToEndDirective],
})
@CallSetValueChanges()
export class PageWidthDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  setValueChanges() {
    this.cardEventsFacadeService.blocks$$
      .pipe(startWith(this.cardEventsFacadeService.blocks))
      .subscribe((blocks) => {
        const length = blocks.length;
        this.el.nativeElement.style.width =
          length * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE + 'px';
      });
  }
}
