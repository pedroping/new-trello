import { Directive, ElementRef, Renderer2, input } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { map, merge, startWith } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Directive({
  selector: 'button',
  standalone: true,
})
@CallSetValueChanges()
export class DisableButtonOnDragDirective {
  disabled$ = merge(
    this.cardEventsFacadeService.onMove$$,
    this.cardEventsFacadeService.onCardMove$$,
  ).pipe(
    startWith(),
    map(() => {
      return !!(
        this.cardEventsFacadeService.onMove ||
        this.cardEventsFacadeService.onCardMove
      );
    }),
  );

  disabledAbsolut = input<boolean>(false, {
    alias: 'always-static',
  });
  divCreated = document.createElement('div');

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef<HTMLButtonElement>,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  setValueChanges() {
    this.disabled$.subscribe((val) => this.createDivOver(val));
  }

  createDivOver(val: boolean) {
    const btnParent = this.elementRef.nativeElement
      .parentElement as HTMLElement;

    if (btnParent) this.renderer.setStyle(btnParent, 'position', 'relative');

    if (!this.disabledAbsolut())
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'position',
        'absolute',
      );

    if (!val) {
      this.renderer.removeChild(btnParent, this.divCreated);
      return;
    }

    if (btnParent.contains(this.divCreated)) return;

    this.renderer.setStyle(this.divCreated, 'position', 'absolute');
    this.renderer.setStyle(this.divCreated, 'width', '100%');
    this.renderer.setStyle(this.divCreated, 'height', '100%');
    this.renderer.appendChild(btnParent, this.divCreated);
  }
}
