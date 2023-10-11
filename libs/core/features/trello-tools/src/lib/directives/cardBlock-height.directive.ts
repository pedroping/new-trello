import {
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CardFooterComponent } from '../components/card-footer/card-footer.component';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { ScrollEventsService } from '@my-monorepo/core/facades';

@Directive({
  selector: '[trelloCardBlockHeight]',
  exportAs: 'trelloCardBlockHeight',
})
export class CardBlockHeightDirective {
  constructor(
    private readonly dragAndDropService: DragAndDropService,
    private readonly scrollEventsService: ScrollEventsService
  ) {}

  @ContentChild(CardFooterComponent, { read: ElementRef }) footer?: ElementRef;
  @ContentChild('cardList') cardList?: ElementRef;

  @Input({ required: true }) id = -1;
  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input('trelloCardBlockHeight') length!: number;

  @HostBinding('style.height') get cardHeight() {
    if (this.footer)
      this.footer.nativeElement.style.top = this.footerTop + 'px';

    const isLastHovered = this.dragAndDropService.lastToBeHovered === this.id;
    if (
      this.dragAndDropService.onCardMove$.value &&
      !this.isSelected &&
      isLastHovered &&
      this.scrollEventsService.onMouseDown$.value
    ) {
      const calcedHeight = (this.length + 1) * 40 + this.baseSize;
      return calcedHeight + 'px';
    }

    const calcedHeight = this.length * 40 + this.baseSize;
    return calcedHeight + 'px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.dragAndDropService.onCardMove$.value) {
      this.dragAndDropService.lastToBeHovered = this.id;
      if (this.isSelected) this.dragAndDropService.lastToBeHovered = -1;
    }
  }

  get footerTop() {
    const isLastHovered = this.dragAndDropService.lastToBeHovered === this.id;
    const hasExpand =
      this.dragAndDropService.onCardMove$.value &&
      !this.isSelected &&
      isLastHovered &&
      this.scrollEventsService.onMouseDown$.value;
    const baseTop = this.length * 40 + (hasExpand ? 40 : 0);
    const maxTop = window.innerHeight * 0.7;

    return Math.min(baseTop, maxTop);
  }
}
