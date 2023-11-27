import { Directive } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[cursorDragging]',
  standalone: true,
})
@UntilDestroy()
@CallSetValueChanges()
export class CursorDraggingDirective {
  private _body = document.querySelector('body');

  constructor(private readonly dragAndDropService: DragAndDropService) {}

  setValueChanges() {
    const moveEvent$ = merge(
      this.dragAndDropService.onCardMove$,
      this.dragAndDropService.onMove$
    );

    moveEvent$.pipe(untilDestroyed(this)).subscribe(() => {
      const hasMove =
        this.dragAndDropService.onCardMove$.value ||
        this.dragAndDropService.onMove$.value;

      const cursorType = hasMove ? 'grabbing' : 'default';

      if (!this._body) return;

      this._body.style.cursor = cursorType;
    });
  }
}
