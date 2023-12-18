import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  elements: HTMLElement[] = [];
  constructor() {}
}
