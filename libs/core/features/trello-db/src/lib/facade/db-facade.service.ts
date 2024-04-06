import { Injectable } from '@angular/core';
import { IBlock, ISrcImg, Icard } from '@my-monorepo/core/utlis';
import { combineLatest, switchMap } from 'rxjs';
import { INewBlock } from '../models/card-block-db-models';
import { CardBlockDbService } from '../services/card-block-db/card-block-db.service';
import { CardDbService } from '../services/card-db/card-db.service';
import { WallpapersDbService } from '../services/wallpapers-db/wallpapers-db.service';

@Injectable({ providedIn: 'root' })
export class DbFacadeService {
  allBlocks$ = this.cardBlockDbService.getAllElements$();
  allWallpapers$ = this.wallpapersDbService.getAllElements$();

  constructor(
    private readonly cardDbService: CardDbService,
    private readonly cardBlockDbService: CardBlockDbService,
    private readonly wallpapersDbService: WallpapersDbService,
  ) {}

  startDomain() {
    this.cardDbService.createDataBase();
    this.cardBlockDbService.createDataBase();
    this.wallpapersDbService.createDataBase();
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

  createCard(element: Omit<Icard, 'id'>) {
    return this.cardDbService.addNewElement(element);
  }

  createWallpaper(element: Partial<ISrcImg>) {
    return this.wallpapersDbService.addNewElement(element);
  }

  deleteBlock(id: number) {
    return this.cardBlockDbService
      .deleteElement(id)
      .pipe(switchMap(() => this.cardDbService.deleteAllByBlockId(id)));
  }

  deleteCard(id: number) {
    return this.cardDbService.deleteElement(id);
  }

  deleteWallpaper(id: number) {
    return this.wallpapersDbService.deleteElement(id);
  }

  editBlock(element: IBlock) {
    return this.cardBlockDbService.editElement(element);
  }

  editCard(element: Icard) {
    return this.cardDbService.editElement(element);
  }

  editWallPaper(element: ISrcImg) {
    return this.wallpapersDbService.editElement(element);
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

  setAllElements() {
    this.cardBlockDbService.setAllElements();
  }
}
