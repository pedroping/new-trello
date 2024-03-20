import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragElementsService {
  elements: HTMLElement[] = [];
  constructor() {}

  hasPreventElement(elementEvent: HTMLElement) {
    return !!this.elements.find((element) => {
      return element.contains(elementEvent) || element == elementEvent;
    });
  }
}
