import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { startWith } from 'rxjs';
import { BASE_ADD_NEW_SIZE, BASE_BLOCK_SIZE } from '../../models/values';
import { ScrollToEndDirective } from '../scroll-to-end/scroll-to-end.directive';
@Directive({
  selector: '[pageWidth]',
  hostDirectives: [ScrollToEndDirective],
  standalone: true,
})
@CallSetValueChanges()
export class PageWidthDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly dbFacadeService: DbFacadeService,
  ) {}

  setValueChanges() {
    this.dbFacadeService.allBlocks$
      .pipe(startWith(this.dbFacadeService.allBlocks$.value))
      .subscribe((blocks) => {
        const length = blocks.length;
        const newWidth = length * BASE_BLOCK_SIZE + BASE_ADD_NEW_SIZE + 'px';
        this.renderer.setStyle(this.el.nativeElement, 'width', newWidth);
      });
  }
}
