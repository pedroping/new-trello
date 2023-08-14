import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { BASIC_INPUTS, IInputBuilder } from '../../models/models';

@Directive({
  selector: '[generateDirective]',
})
export class GenerateDirective<T> implements OnInit {
  @Input({ required: true }) config!: IInputBuilder<T>;
  basicInputs = BASIC_INPUTS;

  constructor(private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.vcr.clear();

    if (this.config.isBasicInput) {
      const inputName = this.config.inputName as keyof typeof this.basicInputs;
      console.log(this.basicInputs, inputName);
      
      const newForm = this.vcr.createComponent(this.basicInputs[inputName]);
      newForm.instance.config = this.config;
    }
  }
}
