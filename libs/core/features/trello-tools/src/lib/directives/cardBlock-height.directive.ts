import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { startWith } from 'rxjs';

@Directive({
  selector: '[trelloCardBlockHeight]',
})
export class CardBlockHeightDirective implements OnInit {
  constructor(
    private readonly dragAndDropService: DragAndDropService,
    private readonly elementRef: ElementRef
  ) {
    this.setValueChanges();
  }
  length!: number;
  @Input() baseSize!: number;
  @Input() isSelected = false;
  @Input({ required: true }) type?: 'card' | 'block';
  @Input() cdr?: ChangeDetectorRef;
  @Input() id?: number;
  @Input('trelloCardBlockHeight') set newlength(length: number) {
    this.length = length;
    const calcedHeight = this.length * 40 + this.baseSize;

    this.elementRef.nativeElement.style.height = calcedHeight + 'px';
  }

  @ContentChildren('card') cards?: QueryList<HTMLDivElement>;

  ngOnInit(): void {
    const calcedHeight = this.length * 40 + this.baseSize;

    this.elementRef.nativeElement.style.height = calcedHeight + 'px';
    this.cdr?.detectChanges();
  }

  @HostListener('mouseover') onHover() {
    if (
      this.dragAndDropService.onCardMove$.value &&
      this.type == 'block' &&
      (this.id || this.id == 0)
    )
      this.dragAndDropService.lastToBeHoverd = this.id;

    console.log(this.dragAndDropService.lastToBeHoverd);

    if (this.dragAndDropService.onCardMove$.value && !this.isSelected) {
      const calcedHeight = (this.length + 1) * 40 + this.baseSize;
      console.log(calcedHeight);
      
      this.elementRef.nativeElement.style.height = calcedHeight < 50 ? 50 : calcedHeight + 'px';
      this.cdr?.detectChanges();
      return;
    }
  }

  @HostListener('mouseleave') onLeave() {
    if (this.type == 'block' && this.dragAndDropService.onCardMove$.value) {
      const cardList = this.elementRef.nativeElement.children[1].children[0];
      console.log(cardList);
    }
  }

  setValueChanges() {
    this.dragAndDropService.onCardMove$.subscribe((value) => {
      if (
        this.type == 'block' &&
        this.id != this.dragAndDropService.lastToBeHoverd
      ) {
        this.ngOnInit();
      }
    });

    this.dragAndDropService.onCardDrop$.subscribe(() => {
      const calcedHeight = this.length * 40 + this.baseSize;

      this.elementRef.nativeElement.style.height = calcedHeight + 'px';
    });
  }
}
