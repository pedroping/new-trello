/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CardBlockHeightDirective } from './cardBlock-height.directive';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { ScrollEventsService } from '@my-monorepo/core/facades';

describe('Directive: CardBlockHeight', () => {
  it('should create an instance', () => {
    const directive = new CardBlockHeightDirective(
      new DragAndDropService(),
      new ScrollEventsService()
    );
    expect(directive).toBeTruthy();
  });
});
