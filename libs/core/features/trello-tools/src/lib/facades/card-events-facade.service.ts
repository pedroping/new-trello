import { Injectable } from '@angular/core';
import { CardMocksService } from '../services/card-mocks/card-mocks.service';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Icard } from '../models/card.models';

@Injectable({ providedIn: 'root' })
export class CardEventsFacadeService {
  readonly onMove$$ = this.dragAndDropService.onMove$.asObservable();
  readonly onCardMove$$ = this.dragAndDropService.onCardMove$.asObservable();

  constructor(
    private readonly cardMocksService: CardMocksService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  addNew(name: string) {
    this.cardMocksService.addNew(name);
  }

  setCardMove(value: boolean) {
    this.dragAndDropService.onCardMove$.next(value);
  }

  setBlockMove(value: boolean) {
    this.dragAndDropService.onMove$.next(value);
  }

  drop(event: CdkDragDrop<Icard[]>) {
    this.dragAndDropService.drop(event);
  }

  setLastToBeHovered(value: number) {
    this.dragAndDropService.lastToBeHovered = value;
  }
}
