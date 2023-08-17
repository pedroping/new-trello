import { FormControl } from '@angular/forms';
import { BasicInputComponent } from '../default-components/basic-input/basic-input.component';
import { InjectionToken, Type } from '@angular/core';

export interface IBaseInput {
  label: string;
  placeholder: string;
  formControl?: FormControl;
  formName?: string;
  type: IInputTypes;
  appearance?: 'fill' | 'outline';
  isBasicInput: boolean;
  inputName: string;
}
export interface ISelectInput<T> extends IBaseInput {
  options: T[];
}

export interface IComponentBase<T> {
  config: IInputBuilder<T>;
}

export interface IInputClass<T> {
  [key: string]: Type<IComponentBase<T>>
}


export const BASIC_INPUTS: IInputClass<IBaseInput> = {
  basicInput: BasicInputComponent,
};

export type IInputTypes = 'text' | 'number' | 'email';

export type IInputBuilder<T> = IBaseInput | ISelectInput<T>;

export const DEFAULT_COMPS = new InjectionToken<IInputClass<IBaseInput>>('DEFAULT_COMPS', {
  factory: () => {
    return BASIC_INPUTS
  },
})