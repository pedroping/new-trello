import { Component, Input } from '@angular/core';
import { DefaultFormInput } from '../../models/defaultInput';
import { IBaseInput, IInputBuilder } from '../../models/models';

@Component({
  selector: 'dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
})
export class DynamicFormsComponent<T> {
  @Input({ required: true }) config!: IInputBuilder<T>[];

  constructor() {}
}
