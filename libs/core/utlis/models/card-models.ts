import { InputSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Icard {
  id: number;
  name: string;
  blockId: number;
  cardIndex: number;
}

export interface IBlock {
  id: number;
  name: string;
  blockIndex: number;
  cards$: BehaviorSubject<Icard[]>;
  addNewEvent$: BehaviorSubject<boolean>;
}

export interface IBlockInstance {
  id: InputSignal<number>;
  blockCard: InputSignal<IBlock>;
}
