import { Component, Input } from '@angular/core';
import { IInputBuilder } from '../../models/models';
import { GenerateDirective } from '../generate-directive/generate-directive.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  standalone: true,
  imports: [CommonModule, GenerateDirective],
})
export class DynamicFormsComponent<T> {
  @Input({ required: true }) config!: IInputBuilder<T>[];

  constructor() {}
}
