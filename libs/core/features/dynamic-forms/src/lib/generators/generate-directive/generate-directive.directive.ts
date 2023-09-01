import { Directive, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { BASIC_INPUTS, DEFAULT_COMPS, IBaseInput, IInputBuilder, IInputClass } from '../../models/models';

@Directive({
  selector: '[generateDirective]',
})
export class GenerateDirective<T> implements OnInit {
  @Input({ required: true }) config!: IInputBuilder<T>;
  basicInputs = BASIC_INPUTS;

  constructor(@Inject(DEFAULT_COMPS) private inputs: IInputClass<IBaseInput>, private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.vcr.clear();

    if (this.config.isBasicInput) {
      const inputName = this.config.inputName as keyof typeof this.basicInputs;
      const newForm = this.vcr.createComponent(this.inputs[inputName]);
      newForm.instance.config = this.config;
    }
  }
}
