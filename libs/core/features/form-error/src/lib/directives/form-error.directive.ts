import { Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { startWith } from 'rxjs';
import { ERROR_MESSAGES } from '../models/erro-messages';

@Directive({
  selector: '[formError]',
})
export class FormErrorDirective implements OnInit {
  @HostBinding('innerHTML') innerHtml = '';

  @Input() formErrorControlName?: string;
  @Input() formErrorControl?: FormControl | AbstractControl;

  constructor(
    @Optional() private readonly controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    if (this.formErrorControlName) {
      const control = this.controlContainer.control?.get(
        this.formErrorControlName
      );
      if (control) this.setFormErros(control);
    }
  }

  setFormErros(control: FormControl | AbstractControl) {
    control.valueChanges.pipe(startWith(control.value)).subscribe(() => {
      this.validateErrors(control.errors);
    });
  }

  validateErrors(erros: ValidationErrors | null) {
    if (!erros) {
      this.innerHtml = '';
      return;
    }

    Object.keys(erros).forEach((key) => {
      this.innerHtml = this.getError(key)();
    });
  }

  getError(key: string) {
    return ERROR_MESSAGES[key];
  }
}
