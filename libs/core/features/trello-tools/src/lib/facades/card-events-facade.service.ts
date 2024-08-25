import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { IBlock, Icard } from '@my-monorepo/core/utlis';
import { DragAndDropService } from '../services/drag-and-drop/drag-and-drop.service';

@Injectable({ providedIn: 'root' })
export class CardEventsFacadeService {
  readonly onMove$$ = this.dragAndDropService.onMove$.asObservable();
  readonly onCardMove$$ = this.dragAndDropService.onCardMove$.asObservable();
  readonly objectPosition$$ =
    this.dragAndDropService.objectPosition$.asObservable();

  constructor(private readonly dragAndDropService: DragAndDropService) {}

  startDomain() {
    this.dragAndDropService.startDomain();
  }

  setCardMove(value: boolean, card?: Icard, cardHeight?: number) {
    if (card) this.dragAndDropService.cardMoving = card;
    if (cardHeight != undefined)
      this.dragAndDropService.cardHeight$.next(cardHeight);

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

  objectMove(position: number) {
    this.dragAndDropService.objectPosition$.next(position);
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

  get cardHeight() {
    return this.dragAndDropService.cardHeight$.value;
  }

  get cardHeight$$() {
    return this.dragAndDropService.cardHeight$.asObservable();
  }

  get onCardMove() {
    return this.dragAndDropService.onCardMove$.value;
  }

  get onMove() {
    return this.dragAndDropService.onMove$.value;
  }
}
