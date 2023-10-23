import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { BehaviorSubject, take, timer } from 'rxjs';

@Directive({
  selector: '[scrollToEnd]',
})
export class ScrollToEndDirective implements OnInit {
  @Input({ required: true, alias: 'scrollToEnd' })
  addNewEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.setValueChanges();
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
