import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrelloSidebarToolsComponent } from './trello-sidebar-tools.component';

describe('TrelloSidebarToolsComponent', () => {
  let component: TrelloSidebarToolsComponent;
  let fixture: ComponentFixture<TrelloSidebarToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloSidebarToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrelloSidebarToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
