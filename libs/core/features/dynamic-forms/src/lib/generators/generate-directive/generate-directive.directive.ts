import {
  Directive,
  Inject,
  Input,
  OnInit,
  Optional,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  BASIC_INPUTS,
  ComponentHolder,
  DEFAULT_COMPS,
  IBaseInput,
  IComponentBase,
  IInputBuilder,
} from '../../models/models';

@Directive({
  selector: '[generateDirective]',
  standalone: true,
})
export class GenerateDirective<T> implements OnInit {
  @Input({ required: true }) config!: IInputBuilder<T>;
  basicInputs = BASIC_INPUTS;

  allInputs: Map<string | number, Type<IComponentBase<IBaseInput>>> = new Map();

  constructor(
    @Inject(DEFAULT_COMPS)
    @Optional()
    private inputs: ComponentHolder,
    private vcr: ViewContainerRef
  ) {}

  async ngOnInit() {
    this.vcr.clear();

    if (this.config.isBasicInput) {
      const inputName = this.config.inputName as keyof typeof this.basicInputs;

      const findInput = this.allInputs.get(inputName) as Type<
        IComponentBase<IBaseInput>
      >;

      if (findInput) {
        const newForm = this.vcr.createComponent(findInput);
        newForm.instance.config = this.config;
        return;
      }

      const loadComponent = (await this.inputs[inputName]) as Type<
        IComponentBase<IBaseInput>
      >;

      this.allInputs.set(inputName, loadComponent);
      const newForm = this.vcr.createComponent(loadComponent);
      newForm.instance.config = this.config;
    }
  }
}
