import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { Observable, startWith } from 'rxjs';

@Directive({
  selector: '[hideSidenavs]',
})
@CallSetValueChanges()
export class HideSidenavsDirective {
  @Input('hideSidenavs') createObservable$!: Observable<boolean>;
  @Input('hideSidenavsInitialState') initialState!: boolean;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  setValueChanges() {
    this.viewContainerRef.clear();
    this.createObservable$
      .pipe(startWith(this.initialState))
      .subscribe((state) => {
        state
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear();
      });
  }
}
