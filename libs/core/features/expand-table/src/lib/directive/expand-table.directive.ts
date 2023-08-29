import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[expandTable]'
})
export class ExpandTableDirective {

  @HostBinding('class.expand-detail-row') get ExpandTable() {
    return true
  }

  constructor() { }

}
