import { BehaviorSubject, Observable } from 'rxjs';

export const CARD_SIZE = 40;
export const FOOTER_TOP = 220;
export interface Icard {
  id?: number;
  name: string;
  blockId?: number;
}
export interface IBlock {
  id: number;
  name: string;
  cards$: Observable<Icard[]>;
  addNewEvent$: BehaviorSubject<boolean>;
}
