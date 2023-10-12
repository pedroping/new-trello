/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OutsideAddBlockClickDirective } from './outside-add-block-click.directive';
import { ElementRef } from '@angular/core';
import { OutsideClickEventsService } from '@my-monorepo/core/facades';

describe('Directive: OutsideAddBlockClick', () => {
  it('should create an instance', () => {
    const directive = new OutsideAddBlockClickDirective(
      new ElementRef('<div></div>'),
      new OutsideClickEventsService()
    );
    expect(directive).toBeTruthy();
  });
});
