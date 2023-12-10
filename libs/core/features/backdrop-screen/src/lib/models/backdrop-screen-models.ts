import { TemplateRef } from '@angular/core';

export interface BackDropEvent {
  domRect: DOMRect;
  template: TemplateRef<unknown>;
}
