import { Injector, Type } from '@angular/core';

export interface BackDropEvent<T> {
  domRect: DOMRect;
  component: Type<unknown>;
  data?: T;
  injector?: Injector;
  useSize?: boolean;
}
