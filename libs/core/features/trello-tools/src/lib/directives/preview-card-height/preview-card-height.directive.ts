import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Directive({
  selector: '[previewCardHeight]',
  standalone: true,
})
@CallSetValueChanges()
export class PreviewCardHeightDirective {
  constructor(
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  setValueChanges() {
    this.cardEventsFacadeService.cardHeight$$.subscribe((value) =>
      this.renderer2.setStyle(
        this.elementRef.nativeElement,
        'height',
        value + 'px',
      ),
    );
  }
}
