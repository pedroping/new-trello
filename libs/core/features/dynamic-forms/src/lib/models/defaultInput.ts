import { Injectable, input } from '@angular/core';
import { IComponentBase, IInputBuilder } from './models';

@Injectable()
export class DefaultFormInput<T> implements IComponentBase<T> {
  config = input.required<IInputBuilder<T>>();
}
