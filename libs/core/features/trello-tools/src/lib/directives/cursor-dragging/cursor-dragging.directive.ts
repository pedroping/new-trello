import { Directive } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Directive({
  selector: '[cursorDragging]',
  standalone: true,
})
@UntilDestroy()
@CallSetValueChanges()
export class CursorDraggingDirective {
  private _body = document.querySelector('body');

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  setValueChanges() {
    const moveEvent$ = merge(
      this.cardEventsFacadeService.onCardMove$$,
      this.cardEventsFacadeService.onMove$$
    );

    moveEvent$.pipe(untilDestroyed(this)).subscribe(() => {
      const hasMove =
        this.cardEventsFacadeService.onCardMove ||
        this.cardEventsFacadeService.onMove;

      const cursorType = hasMove ? 'grabbing' : 'default';

      if (!this._body) return;

      this._body.style.cursor = cursorType;
    });
  }
}
