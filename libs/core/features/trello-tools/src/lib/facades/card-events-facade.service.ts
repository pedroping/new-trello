import { Injectable } from '@angular/core';
import { CardMocksService } from '../services/card-mocks/card-mocks.service';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';

@Injectable({ providedIn: 'root' })
export class CardEventsFacadeService {
  constructor(
    private readonly cardMocksService: CardMocksService,
    private readonly dragAndDropService: DragAndDropService
  ) {}
}
