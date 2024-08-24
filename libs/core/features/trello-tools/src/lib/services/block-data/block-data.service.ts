import { Injectable } from '@angular/core';
import { IBlock, IBlockInstanceService } from '@my-monorepo/core/utlis';

@Injectable()
export class BlockDataService implements IBlockInstanceService {
  #id?: number;
  #block?: IBlock;

  get id() {
    return this.#id as number;
  }

  get block() {
    return this.#block as IBlock;
  }

  setId(id: number): void {
    this.#id = id;
  }
  setBlock(block: IBlock): void {
    this.#block = block;
  }
}
