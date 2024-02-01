import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[backDropContent]',
})
export class BackdropContentDirective {
  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
