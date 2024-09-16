import { Injectable } from '@angular/core';
import { Icard, IData, ISimpleBlock, ISrcImg } from '@my-monorepo/core/utlis';
import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  skip,
  take,
  throttleTime,
} from 'rxjs';
import { CardBlockDbService } from '../card-block-db/card-block-db.service';
import { CardDbService } from '../card-db/card-db.service';
import { WallpapersDbService } from '../wallpapers-db/wallpapers-db.service';
import { IAddNewResponse } from '../../models/base-db-models';

@Injectable({ providedIn: 'root' })
export class ImportExportDataService {
  constructor(
    private readonly cardDbService: CardDbService,
    private readonly cardBlockDbService: CardBlockDbService,
    private readonly wallpapersDbService: WallpapersDbService,
  ) {}

  importContent() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';

    document.body.appendChild(input);

    fromEvent(input, 'change').subscribe((event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];

      if (!file) return;

      if (file.type != 'application/json')
        return alert('Apenas arquivos do tipo json são aceitos');

      const reader = new FileReader();

      reader.onload = () => {
        const data = JSON.parse(reader.result?.toString() ?? '{}') as IData;

        if (!data?.blocks || !data?.cards || !data?.wallpapers)
          return alert('Arquivo invalido, por favor tente outro arquivo');

        this.addWalpapers(data.wallpapers);
        this.addBlocks(data.blocks, data.cards);
      };

      reader.readAsText(file);
    });

    input.click();
  }

  private addBlocks(blocks: ISimpleBlock[], cards: Icard[]) {
    blocks.forEach((block) => {
      const filteredCards = cards.filter((card) => card.blockId == block.id);

      this.cardBlockDbService
        .addNewElement({ name: block.name })
        .subscribe((response) => {
          if (response.id == -1) return;

          const addAll: Observable<IAddNewResponse>[] = [];

          filteredCards.forEach((card) => {
            const formatedCard = {
              name: card.name,
              blockId: response.id,
              cardIndex: card.cardIndex,
            };

            addAll.push(this.cardDbService.addNewElement(formatedCard));
          });

          combineLatest(addAll).subscribe(() => {
            this.cardBlockDbService.setAllElements();
          });
        });
    });
  }

  private addWalpapers(wallpapers: ISrcImg[]) {
    wallpapers.forEach((wallpaper) => {
      const formatedWallpaper = {
        selected: false,
        src: wallpaper.src,
      };

      this.wallpapersDbService
        .addNewElement(formatedWallpaper)
        .subscribe((response) => {
          if (response.id != -1) this.wallpapersDbService.setAllElements();
        });
    });
  }

  exportContent() {
    combineLatest([
      this.cardBlockDbService.getAllElements$().asObservable(),
      this.cardDbService.getAllElements$().asObservable().pipe(skip(1)),
      this.wallpapersDbService.getAllElements$(),
    ])
      .pipe(
        throttleTime(500),
        map((data) => {
          return {
            cards: data[1],
            wallpapers: data[2],
            blocks: this.cardBlockDbService.mapBlocks(data[0]),
          };
        }),
        take(1),
      )
      .subscribe((data) => {
        const blob = new Blob([JSON.stringify(data)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }
}
