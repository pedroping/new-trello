import { BehaviorSubject, Observable } from 'rxjs';

export interface Icard {
  id: number;
  name: string;
  blockId: number;
  cardIndex: number;
}

export interface ISimpleBlock {
  id: number;
  name: string;
  blockIndex: number;
}

export interface IBlock {
  id: number;
  name: string;
  blockIndex: number;
  cards$: BehaviorSubject<Icard[]>;
  addNewEvent$: BehaviorSubject<boolean>;
}

export interface IBlockInstanceService {
  id: number;
  block: IBlock;
  cardsHeight: number;
  setId(id: number): void;
  setBlock(block: IBlock): void;
  cardsHeight$$: Observable<number>;
  setCardsHeight(value: number): void;
}

export interface IcardAsProperty {
  card: Icard;
}
