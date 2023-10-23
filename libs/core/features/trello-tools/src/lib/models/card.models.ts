import { BehaviorSubject } from "rxjs";

export interface Icard {
    id: number;
    name: string;
  }
  export interface IBlock {
    name: string;
    cards: Icard[];
    addNewEvent$: BehaviorSubject<boolean>;
  }
  