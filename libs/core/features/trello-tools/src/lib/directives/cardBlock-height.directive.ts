import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[trelloCardBlockHeight]',
})
export class CardBlockHeightDirective {
  constructor() {}

  @Input('trelloCardBlockHeight') length!: number;
  @Input() baseSize!: number;

  @HostBinding('style.height') get cardHeight() {
    return this.length * 35 + this.baseSize + 'px';
  }
}
