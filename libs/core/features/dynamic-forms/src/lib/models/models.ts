import { FormControl } from "@angular/forms";

export interface IBaseInput {
    label: string;
    placeholder: string;
    formControl?: FormControl;
    formName?: string;
    type: IInputTypes;
}

export interface ISelectInput<T> extends IBaseInput {
    options: T[]
}

export interface IComponentBase<T> {
    config: IInputBuilder<T>
}

export type IInputTypes = 'text' | 'number' | 'email'


export type IInputBuilder<T> = IBaseInput | ISelectInput<T> 

