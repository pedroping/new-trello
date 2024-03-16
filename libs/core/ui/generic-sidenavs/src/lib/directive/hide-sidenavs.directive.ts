import { Directive, TemplateRef, ViewContainerRef, input } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { Observable, startWith } from 'rxjs';

@Directive({
  selector: '[hideSidenavs]',
  standalone: true,
})
@CallSetValueChanges()
export class HideSidenavsDirective {
  createObservable$ = input<Observable<boolean>>(new Observable<boolean>(), {
    alias: 'hideSidenavs',
  });
  initialState = input<boolean>(false, { alias: 'hideSidenavsInitialState' });

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  setValueChanges() {
    this.viewContainerRef.clear();
    this.createObservable$()
      .pipe(startWith(this.initialState))
      .subscribe((state) => {
        this.viewContainerRef.clear();
        state
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear();
      });
  }
}
