/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardBlockContentComponent } from './card-block-content.component';

describe('CardBlockContentComponent', () => {
  let component: CardBlockContentComponent;
  let fixture: ComponentFixture<CardBlockContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardBlockContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBlockContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
