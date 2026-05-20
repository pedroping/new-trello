/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MemoryLocationStrategy extends LocationStrategy {
  private internalPath = '/';
  private internalState: unknown = null;
  private pathSubject = new Subject<any>();

  path(_?: boolean): string {
    return this.internalPath;
  }

  prepareExternalUrl(internal: string): string {
    return internal;
  }

  pushState(state: any, _: string, url: string, __: string): void {
    this.internalPath = url;
    this.internalState = state;
    this.pathSubject.next({ type: 'pushState', url });
  }

  replaceState(state: any, _: string, url: string, __: string): void {
    this.internalPath = url;
    this.internalState = state;
  }

  forward(): void {}

  back(): void {}

  onPopState(fn: any): void {
    this.pathSubject.subscribe(fn);
  }

  getBaseHref(): string {
    return '/';
  }

  getState(): unknown {
    return this.internalState;
  }
}
