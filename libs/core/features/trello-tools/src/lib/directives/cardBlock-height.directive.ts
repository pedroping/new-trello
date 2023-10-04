import { ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { CardFooterComponent } from '../components/card-footer/card-footer.component';

@Directive({
  selector: '[trelloCardBlockHeight]',
  exportAs: 'trelloCardBlockHeight',
})
export class CardBlockHeightDirective {
  constructor(private readonly dragAndDropService: DragAndDropService) { }

  @ContentChild(CardFooterComponent, { read: ElementRef }) footer?: ElementRef

  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input({ required: true }) type?: 'card' | 'block';
  @Input('trelloCardBlockHeight') length!: number;

  footerTop = 0;

  @HostBinding('style.height') get cardHeight() {
    this.setFooterTop();

    if (this.footer)
      this.footer.nativeElement.style.top = this.footerTop + 'px'

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
