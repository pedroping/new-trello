import { Icard, ISimpleBlock } from './card-models';
import { ISrcImg } from './wallpaper-models';

export interface IData {
  cards?: Icard[];
  blocks?: ISimpleBlock[];
  wallpapers?: ISrcImg[];
}
