import { BehaviorSubject } from 'rxjs';

export const CARD_SIZE = 40;
export const FOOTER_TOP = 220;
export interface Icard {
  id: number;
  name: string;
}
export interface IBlock {
  name: string;
  cards: Icard[];
  addNewEvent$: BehaviorSubject<boolean>;
}
