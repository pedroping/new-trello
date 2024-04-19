import { Directive, TemplateRef } from '@angular/core';
import { BackDropEvent } from '../models/backdrop-screen-models';

@Directive({
  selector: '[backDropContent]',
  standalone: true,
})
export class BackdropContentDirective<T>
  implements Omit<BackDropEvent<T>, 'component'>
{
  constructor(private readonly template: TemplateRef<unknown>) {}

  get domRect() {
    const parentElement = (
      this.template.elementRef.nativeElement as HTMLElement
    ).parentElement as HTMLElement;
    return parentElement.getBoundingClientRect();
  }
}
