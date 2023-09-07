import {
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  QueryList
} from '@angular/core';

@Directive({
  selector: '[trelloCardBlockHeight]',
})
export class CardBlockHeightDirective {
  constructor() {}

  @Input('trelloCardBlockHeight') length!: number;
  @Input() baseSize!: number;

  @ContentChildren('card') cards?: QueryList<HTMLDivElement>;

  @HostBinding('style.height') get cardHeight() {
    return (this.length ) * 38 + this.baseSize + 'px';
  }
}
