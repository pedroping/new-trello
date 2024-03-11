import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';
import { IBlock, Icard } from '@my-monorepo/core/utlis';

@Injectable({ providedIn: 'root' })
export class CardEventsFacadeService {
  readonly onMove$$ = this.dragAndDropService.onMove$.asObservable();
  readonly onCardMove$$ = this.dragAndDropService.onCardMove$.asObservable();

  constructor(private readonly dragAndDropService: DragAndDropService) {}

  startDomain() {
    this.dragAndDropService.startDomain();
  }

  setCardMove(value: boolean, card?: Icard) {
    if (card) this.dragAndDropService.cardMoving = card;
    this.dragAndDropService.onCardMove$.next(value);
  }

  setBlockMove(value: boolean) {
    this.dragAndDropService.onMove$.next(value);
  }

  drop(event: CdkDragDrop<Icard[]>) {
    this.dragAndDropService.drop(event);
  }

  onEvent(value: boolean) {
    this.dragAndDropService.onEvent(value);
  }

  blockDrop(event: CdkDragDrop<IBlock[]>) {
    this.dragAndDropService.blockDrop(event);
    this.onEvent(false);
  }

  setLastToBeHovered(value: number) {
    this.dragAndDropService.lastToBeHovered = value;
  }

  moveToBlock(blockToRemove: Icard[], blockToAdd: Icard[], card: Icard) {
    this.dragAndDropService.moveToBlock(blockToRemove, blockToAdd, card);
  }

  validCardsOrder(oldListId: number, newListId: number) {
    this.dragAndDropService.validCardsOrder(oldListId, newListId);
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
}
