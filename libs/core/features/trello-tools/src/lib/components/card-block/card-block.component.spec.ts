/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardBlockComponent } from './card-block.component';

describe('CardBlockComponent', () => {
  let component: CardBlockComponent;
  let fixture: ComponentFixture<CardBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
