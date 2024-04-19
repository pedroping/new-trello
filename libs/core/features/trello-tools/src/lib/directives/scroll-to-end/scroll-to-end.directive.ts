import { Directive, ElementRef, Inject, inject } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';
import { BehaviorSubject, take, timer } from 'rxjs';

@Directive({
  selector: '[scrollToEnd]',
  standalone: true,
})
@CallSetValueChanges()
export class ScrollToEndDirective {
  addNewEvent$: BehaviorSubject<boolean>;
  private readonly elementRef = inject(ElementRef);

  constructor(@Inject(BLOCK_TOKEN) cardBlock: IBlockInstance) {
    this.addNewEvent$ = cardBlock.block.addNewEvent$;
  }

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
