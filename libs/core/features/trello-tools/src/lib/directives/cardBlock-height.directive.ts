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

    const expandedCalcedHeight = (this.length + 1) * 40 + this.baseSize;
    const isLastHovered = this.dragAndDropService.lastToBeHovered === this.id;
    const onMouseDown = this.scrollEventsService.onMouseDown$.value;
    const onCardMove = this.dragAndDropService.onCardMove$.value;

    if (onMouseDown && onCardMove && this.isSelected && isLastHovered)
      return expandedCalcedHeight + 'px';

    if (onCardMove && isLastHovered && !this.isSelected)
      return expandedCalcedHeight + 'px';

    const calcedHeight = this.length * 40 + this.baseSize;
    return calcedHeight + 'px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const onMouseDown = this.scrollEventsService.onMouseDown$.value;
    const onCardMove = this.dragAndDropService.onCardMove$.value;

    if (onMouseDown && onCardMove) {
      this.dragAndDropService.lastToBeHovered = this.id;
      if (this.isSelected) this.dragAndDropService.lastToBeHovered = -1;
    }
  }

  get footerTop() {
    const isLastHovered = this.dragAndDropService.lastToBeHovered === this.id;
    const onMouseDown = this.scrollEventsService.onMouseDown$.value;
    const onCardMove = this.dragAndDropService.onCardMove$.value;
    const isOnMouseDown =
      onMouseDown && isLastHovered && onCardMove && this.isSelected;
    const hasExpand = onCardMove && isLastHovered && !this.isSelected;

    const baseTop = this.length * 40 + (hasExpand || isOnMouseDown ? 40 : 0);
    const maxTop = window.innerHeight * 0.7;

    return Math.min(baseTop, maxTop);
  }
}
