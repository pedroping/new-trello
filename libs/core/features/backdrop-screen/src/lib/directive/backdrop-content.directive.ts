import { Directive, TemplateRef } from '@angular/core';
import { BackDropEvent } from '../models/backdrop-screen-models';

@Directive({
  selector: '[backDropContent]',
})
export class BackdropContentDirective implements BackDropEvent {
  constructor(readonly template: TemplateRef<unknown>) {}

  get domRect() {
    const nativeElement = this.template.elementRef.nativeElement as HTMLElement;
    return nativeElement.parentElement!.getBoundingClientRect();
  }
}
