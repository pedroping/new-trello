import { Directive, ElementRef, HostBinding, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, ValidationErrors } from '@angular/forms';
import { startWith } from 'rxjs';

@Directive({
  selector: '[formError]'
})
export class FormErrorDirective implements OnInit {

  @HostBinding('innerHTML') innerHtml = 'aaaaaaa'

  @Input() formErrorControlName?: string
  @Input() formErrorControl?: FormControl | AbstractControl


  constructor(
    @Optional() private readonly controlContainer: ControlContainer,
  ) { }

  ngOnInit(): void {
    if (this.formErrorControlName) {
      const control = this.controlContainer.control?.get(this.formErrorControlName)
      if (control)
        this.setFormErros(control)
    }
  }


  setFormErros(control: FormControl | AbstractControl) {
    control.valueChanges.pipe(startWith(control.value)).subscribe(() => {
      this.validateErrors(control.errors)
    })
  }

  validateErrors(erros: ValidationErrors | null) {
    // if (!erros) this.viewContainerRef.clear()
    // if (this.elementRef)
    //   this.viewContainerRef.createEmbeddedView(this.elementRef.nativeElement)

  }
}
