import { Directive, HostBinding, Input } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[trelloCardBlockHeight]',
  exportAs: 'trelloCardBlockHeight',
})
export class CardBlockHeightDirective {
  constructor(private readonly dragAndDropService: DragAndDropService) {}

  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input({ required: true }) type?: 'card' | 'block';
  @Input('trelloCardBlockHeight') length!: number;

  footerTop: number = 0;

  @HostBinding('style.height') get cardHeight() {
    this.setFooterTop();
    if (this.dragAndDropService.onCardMove$.value && !this.isSelected) {
      const calcedHeight = (this.length + 1) * 40 + this.baseSize;
      return calcedHeight + 'px';
    }
    const calcedHeight = this.length * 40 + this.baseSize;
    return calcedHeight + 'px';
  }

  setFooterTop() {
    const hasExpand =
      this.dragAndDropService.onCardMove$.value && !this.isSelected;
    const baseTop = this.length * 40 + (hasExpand ? 40 : 0);
    const maxTop = window.innerHeight * 0.7;

    this.footerTop = Math.min(baseTop, maxTop);
  }
}
