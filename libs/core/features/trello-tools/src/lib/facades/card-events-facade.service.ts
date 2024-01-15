import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CardMocksService } from '../services/card-mocks/card-mocks.service';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IBlock, Icard } from '../models/card.models';
import { throttleTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardEventsFacadeService {
  readonly onMove$$ = this.dragAndDropService.onMove$.asObservable();
  readonly onCardMove$$ = this.dragAndDropService.onCardMove$
    .asObservable()
    .pipe(throttleTime(200));
  readonly blocks$$ = this.cardMocksService.blocks$.asObservable();

  constructor(
    private readonly cardMocksService: CardMocksService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  startDomain() {
    this.dragAndDropService.startDomain();
  }

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

  onEvent(cdr: ChangeDetectorRef, value: boolean) {
    this.dragAndDropService.onEvent(cdr, value);
  }

  blockDrop(event: CdkDragDrop<IBlock[]>) {
    this.dragAndDropService.blockDrop(event);
  }

  setLastToBeHovered(value: number) {
    this.dragAndDropService.lastToBeHovered = value;
  }

  getAllCards(value = false) {
    this.cardMocksService.getAllCards(value);
  }

  moveToBlock(blockToRemove: Icard[], blockToAdd: Icard[], card: Icard) {
    this.dragAndDropService.moveToBlock(blockToRemove, blockToAdd, card);
  }

  get lastToBeHovered() {
    return this.dragAndDropService.lastToBeHovered;
  }

  get onCardMove() {
    return this.dragAndDropService.onCardMove$.value;
  }

  get onMove() {
    return this.dragAndDropService.onMove$.value;
  }

  get blocks() {
    return this.cardMocksService.blocks$.value;
  }
}
