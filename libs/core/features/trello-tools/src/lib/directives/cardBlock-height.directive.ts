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
  ) { this.setValueChanges() }

  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input({ required: true }) type?: 'card' | 'block';
  @Input('trelloCardBlockHeight') length!: number;

  @ContentChildren('card') cards?: QueryList<HTMLDivElement>;

  @HostBinding('style.height') get cardHeight() {
    if (
      this.dragAndDropService.onCardMove$.value &&
      !this.isSelected
    ) {
      const calcedHeight = (this.length + 1) * 40 + this.baseSize;
      return calcedHeight + 'px';
    }
    const calcedHeight = this.length * 40 + this.baseSize;
    return calcedHeight + 'px';
  }

  setValueChanges() {
    this.dragAndDropService.onCardMove$.subscribe((value) => {

      if (this.type == 'block' && this.isSelected) {
        if (value) return this.elementRef.nativeElement.classList.add('onMove')
        this.elementRef.nativeElement.classList.remove('onMove')
      }
    })
  }
}
