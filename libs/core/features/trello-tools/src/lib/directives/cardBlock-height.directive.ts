import {
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[trelloCardBlockHeight]',
})
export class CardBlockHeightDirective {
  constructor(
    private readonly dragAndDropService: DragAndDropService,
    private readonly elementRef: ElementRef
  ) {}

  @Input('trelloCardBlockHeight') length!: number;
  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input() isBlock = false;

  @ContentChildren('card') cards?: QueryList<HTMLDivElement>;

  @HostBinding('style.height') get cardHeight() {
    if (
      this.dragAndDropService.onMove$.value &&
      !this.isSelected &&
      this.isBlock
    ) {
      const calcedHeight = (this.length + 1) * 40 + this.baseSize;
      return calcedHeight < 100 ? 150 + 'px' : calcedHeight + 'px';
    }
    const calcedHeight = this.length * 40 + this.baseSize;
    return calcedHeight < 100 ? 150 + 'px' : calcedHeight + 'px';
  }
}
