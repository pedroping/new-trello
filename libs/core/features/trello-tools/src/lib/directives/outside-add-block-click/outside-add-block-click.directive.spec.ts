/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OutsideAddBlockClickDirective } from './outside-add-block-click.directive';
import { ElementRef } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

describe('Directive: OutsideAddBlockClick', () => {
  it('should create an instance', () => {
    const directive = new OutsideAddBlockClickDirective(
      new ElementRef('<div></div>'),
      new OutsideClickEventsService(),
      new DragAndDropService()
    );
    expect(directive).toBeTruthy();
  });
});
