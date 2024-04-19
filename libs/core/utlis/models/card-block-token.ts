import { InjectionToken } from '@angular/core';
import { IBlockInstance } from './card-models';

export const BLOCK_TOKEN = new InjectionToken<IBlockInstance>('BLOCK_TOKEN');
