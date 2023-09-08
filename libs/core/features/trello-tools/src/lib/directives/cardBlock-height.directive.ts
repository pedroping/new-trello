import {
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';

@Directive({
  selector: '[trelloCardBlockHeight]',
})
export class CardBlockHeightDirective {
  constructor(private readonly dragAndDropService: DragAndDropService) {}

  @Input('trelloCardBlockHeight') length!: number;
  @Input() baseSize!: number;

  @ContentChildren('card') cards?: QueryList<HTMLDivElement>;

  @HostBinding('style.height') get cardHeight() {
    if (this.dragAndDropService.onMove$.value)
      return (this.length + 1) * 36 + this.baseSize + 'px';
    return this.length * 36 + this.baseSize + 'px';
  }
}
