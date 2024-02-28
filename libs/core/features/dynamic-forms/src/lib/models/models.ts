import { InjectionToken } from '@angular/core';
import { FormControl } from '@angular/forms';

export type IInputTypes = 'text' | 'number' | 'email';

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

export type IInputBuilder<T> = IBaseInput | ISelectInput<T>;

export interface IComponentBase<T> {
  config: IInputBuilder<T>;
}

export interface KeyObject<T> {
  [key: string]: T;
}

export type ComponentHolder = KeyObject<IComponentBase<IBaseInput> | unknown>;

export const BASIC_INPUTS: ComponentHolder = {
  BasicInputComponent: import(
    '../default-components/basic-input/basic-input.component'
  ).then((c) => c.BasicInputComponent),
};

export const DEFAULT_COMPS = new InjectionToken<ComponentHolder>(
  'DEFAULT_COMPS',
  {
    factory: () => {
      return BASIC_INPUTS;
    },
  }
);
