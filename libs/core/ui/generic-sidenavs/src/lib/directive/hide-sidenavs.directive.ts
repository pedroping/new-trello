import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  input,
} from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import {
  AnimateService,
  SIDEBAR_ANIMATION_LEFT_ENTER,
  SIDEBAR_ANIMATION_LEFT_EXIT,
  SIDEBAR_ANIMATION_RIGHT_ENTER,
  SIDEBAR_ANIMATION_RIGHT_EXIT,
} from '@my-monorepo/core/ui/animations';
import { Observable, startWith } from 'rxjs';
import { ISideType } from '../models/generic-sidenavs-models';

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
  side = input<ISideType>('right', { alias: 'hideSidenavsSide' });

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly animateService: AnimateService,
  ) {}

  setValueChanges() {
    this.viewContainerRef.clear();

    this.createObservable$()
      .pipe(startWith(this.initialState))
      .subscribe((state) => {
        if (!state) {
          const element = this.elementRef.nativeElement
            .previousSibling as HTMLElement;
          this.exitAnimation(element).subscribe(() => {
            this.viewContainerRef.clear();
          });
          return;
        }

        this.viewContainerRef.clear();
        const element = this.viewContainerRef.createEmbeddedView(
          this.templateRef,
        );
        this.enterAnimate(element.rootNodes[0]);
      });
  }

  enterAnimate(element: HTMLElement) {
    const animation =
      this.side() == 'right'
        ? SIDEBAR_ANIMATION_RIGHT_ENTER
        : SIDEBAR_ANIMATION_LEFT_ENTER;
    this.animateService.animate(element, animation);
  }

  exitAnimation(element: HTMLElement) {
    const animation =
      this.side() == 'right'
        ? SIDEBAR_ANIMATION_RIGHT_EXIT
        : SIDEBAR_ANIMATION_LEFT_EXIT;
    return this.animateService.animate(element, animation);
  }
}
