import { Directive, ElementRef, inject } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BehaviorSubject, take, timer } from 'rxjs';
import { BlockDataService } from '../../services/block-data/block-data.service';

@Directive({
  selector: '[scrollToEnd]',
  standalone: true,
})
@CallSetValueChanges()
export class ScrollToEndDirective {
  addNewEvent$: BehaviorSubject<boolean>;
  private readonly elementRef = inject(ElementRef);

  constructor(private readonly blockDataService: BlockDataService) {
    this.addNewEvent$ = this.blockDataService.block.addNewEvent$;
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
