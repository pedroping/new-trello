import { Injectable, Input } from '@angular/core';
import { IComponentBase, IInputBuilder } from './models';

@Injectable()
export class DefaultFormInput<T> implements IComponentBase<T> {
  @Input({ required: true }) config!: IInputBuilder<T>;
}
