import { BehaviorSubject } from 'rxjs';

export interface Icard {
  id?: number;
  name: string;
  blockId?: number;
}

export interface IBlock {
  id: number;
  name: string;
  blockIndex?: number;
  cards$: BehaviorSubject<Icard[]>;
  addNewEvent$: BehaviorSubject<boolean>;
}
