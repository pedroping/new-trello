import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Directive({
  selector: '[obsavableBasedElement]',
})
@UntilDestroy()
export class ObsavableBasedElementDirective implements OnInit {
  @Input({ required: true }) creatEvent$: Observable<void> =
    new Observable<void>();
  @Input({ required: true }) deleteEvent$: Observable<void> =
    new Observable<void>();

  private readonly vcr = inject(ViewContainerRef);
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.vcr.clear();
    this.setValueChanges();
  }

  setValueChanges() {
    this.creatEvent$.pipe(untilDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this.vcr.createEmbeddedView(this.elementRef.nativeElement);
    });

    this.deleteEvent$.pipe(untilDestroyed(this)).subscribe(() => {
      this.vcr.clear();
    });
  }
}
