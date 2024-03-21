import { Injectable } from '@angular/core';
import { IBlock, Icard } from '@my-monorepo/core/utlis';
import { INewBlock } from '../models/card-block-db-models';
import { CardBlockDbService } from '../services/card-block-db/card-block-db.service';
import { CardDbService } from '../services/card-db/card-db.service';
import { combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbFacadeService {
  allBlocks$ = this.cardBlockDbService.getAllElements$();

  constructor(
    private readonly cardDbService: CardDbService,
    private readonly cardBlockDbService: CardBlockDbService,
  ) {}

  startDomain() {
    this.cardDbService.createDataBase();
    this.cardBlockDbService.createDataBase();
  }

  clearDb() {
    combineLatest([
      this.cardDbService.clearDb(),
      this.cardBlockDbService.clearDb(),
    ]).subscribe(() => {
      this.allBlocks$.next([]);
    });
  }

  createBlock(element: INewBlock) {
    return this.cardBlockDbService.addNewElement(element);
  }

  createCard(element: Icard) {
    return this.cardDbService.addNewElement(element);
  }

  deleteBlock(id: number) {
    return this.cardBlockDbService.deleteElement(id);
  }

  deleteCard(id: number) {
    return this.cardDbService.deleteElement(id);
  }

  editBlock(element: IBlock) {
    return this.cardBlockDbService.editElement(element);
  }

  editCard(element: Icard) {
    return this.cardDbService.editElement(element);
  }

  getBlockById(id: number) {
    return this.cardBlockDbService.getElementById(id);
  }

  getCardById(id: number) {
    return this.cardDbService.getElementById(id);
  }

  getCardsByBlockId(id: number) {
    return this.cardDbService.getByBlockId(id);
  }
}
