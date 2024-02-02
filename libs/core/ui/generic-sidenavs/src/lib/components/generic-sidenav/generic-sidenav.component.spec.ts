/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenericSidenavComponent } from './generic-sidenav.component';

describe('GenericSidenavComponent', () => {
  let component: GenericSidenavComponent;
  let fixture: ComponentFixture<GenericSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenericSidenavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
