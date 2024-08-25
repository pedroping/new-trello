import { Injectable } from '@angular/core';
import { IBlock, IBlockInstanceService } from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BlockDataService implements IBlockInstanceService {
  #id?: number;
  #block?: IBlock;
  #cardsHeight$ = new BehaviorSubject<number>(0);

  get id() {
    return this.#id as number;
  }

  get block() {
    return this.#block as IBlock;
  }

  get cardsHeight() {
    return this.#cardsHeight$.value;
  }

  get cardsHeight$$() {
    return this.#cardsHeight$.asObservable();
  }

  setId(id: number): void {
    this.#id = id;
  }

  setBlock(block: IBlock): void {
    this.#block = block;
  }

  setCardsHeight(value: number): void {
    this.#cardsHeight$.next(value);
  }
}
