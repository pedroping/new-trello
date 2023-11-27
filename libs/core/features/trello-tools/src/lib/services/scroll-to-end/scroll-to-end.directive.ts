import { Directive, ElementRef, Input, inject } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BehaviorSubject, take, timer } from 'rxjs';

@Directive({
  selector: '[scrollToEnd]',
})
@CallSetValueChanges()
export class ScrollToEndDirective  {
  @Input({ required: true, alias: 'scrollToEnd' })
  addNewEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly elementRef = inject(ElementRef);


  setValueChanges() {
    this.addNewEvent$.subscribe((value) => {
      if (value) {
        this.timerSubscription().subscribe(() => {
          this.elementRef.nativeElement.scroll({
            left: 0,
            top: this.elementRef.nativeElement.scrollHeight,
            behavior: 'smooth',
          });
        });
        return;
      }
    });
  }

  timerSubscription = () => timer(100).pipe(take(1));
}
