import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoreFeaturesConditionalElementModule } from '@my-monorepo/core/features/conditional-element';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CardMocksService,
  ClearMocks,
  CoreFeaturesTrelloToolsModule,
  DragAndDropService,
} from '@my-monorepo/core/features/trello-tools';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { Observable, fromEvent } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreFeaturesTrelloToolsModule,
    DragDropModule,
    CoreUiSidenavModule,
    CoreUiToolbarModule,
    CoreFeaturesDragScrollModule,
    CdkDropList,
    CdkDrag,
    RouterLink,
    CoreFeaturesConditionalElementModule,
  ],
})
@ClearMocks()
export class HomePageComponent implements OnInit {
  blocks$ = this.cardMocksService.blocks$;
  injector: Injector;

  creatEvent$!: Observable<void>;
  deleteEvent$!: Observable<void>;

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cardMocksService: CardMocksService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _injector: Injector,
    private readonly elementRef: ElementRef
  ) {
    this.injector = this._injector;
    this.cardMocksService.getAllCards();
  }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    this.creatEvent$ = fromEvent(element, 'mousedown');
    this.deleteEvent$ = fromEvent(element, 'mouseup');
  }

  listDropped(
    event: CdkDragDrop<
      {
        name: string;
        cards: number[];
      }[]
    >
  ) {
    this.dragAndDropService.blockDrop(event);
    this.dragAndDropService.onDrop(this.cdr);
  }

  onMove() {
    this.dragAndDropService.onMove(this.cdr);
  }
}
