import { Directive, OnInit } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { merge } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Directive({
  selector: '[cursorDragging]',
  standalone: true,
})

@UntilDestroy()
export class CursorDraggingDirective implements OnInit {
  private _body = document.querySelector('body');

  constructor(private readonly dragAndDropService: DragAndDropService) {}

  ngOnInit(): void {
    this.setValueChanges();
  }

  setValueChanges() {
    const moveEvent$ = merge(
      this.dragAndDropService.onCardMove$,
      this.dragAndDropService.onMove$
    );

    moveEvent$.pipe(untilDestroyed(this)).subscribe(() => {
      const hasMove =
        this.dragAndDropService.onCardMove$.value || this.dragAndDropService.onMove$.value;

        console.log(hasMove);
        
      const cursorType = hasMove ? 'grabbing' : 'default';

      if (!this._body) return;

      this._body.style.cursor = cursorType;
    });
  }
}
