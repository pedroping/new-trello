import { FormControl } from '@angular/forms';
import { BasicInputComponent } from '../default-components/basic-input/basic-input.component';

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

export const BASIC_INPUTS = {
  basicInput: BasicInputComponent,
};

export type IInputTypes = 'text' | 'number' | 'email';

export type IInputBuilder<T> = IBaseInput | ISelectInput<T>;
