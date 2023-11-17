import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[autoCloseMenu]',
})
@UntilDestroy()
export class CloseMenuDirective implements OnInit {
  @Input({ alias: 'autoCloseMenu', required: true })
  menuTriger!: CdkMenuTrigger;

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
      this.menuTriger?.close();
    });
  }
}
