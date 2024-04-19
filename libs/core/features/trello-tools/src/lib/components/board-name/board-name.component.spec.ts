/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardNameComponent } from './board-name.component';

describe('BoardNameComponent', () => {
  let component: BoardNameComponent;
  let fixture: ComponentFixture<BoardNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardNameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
