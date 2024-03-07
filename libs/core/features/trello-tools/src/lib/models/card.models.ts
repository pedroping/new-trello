import { BehaviorSubject } from 'rxjs';

export const CARD_SIZE = 40;
export const FOOTER_TOP = 220;
export const LIST_ID_ATTR = 'list-id';
export interface Icard {
  id?: number;
  name: string;
  blockId?: number;
}
export interface IBlock {
  id: number;
  name: string;
  cards$: BehaviorSubject<Icard[]>;
  addNewEvent$: BehaviorSubject<boolean>;
}
