import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import {
  AnimateService,
  SIDEBAR_ANIMATION_RIGHT_ENTER,
  SIDEBAR_ANIMATION_RIGHT_EXIT,
} from '@my-monorepo/core/ui/animations';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES, PAGE_COMPONENTS } from '../../models/all-pages';
import { EMPTY, filter, map, pairwise } from 'rxjs';

@Directive({
  selector: 'sidebar-content',
  standalone: true,
})
@CallSetValueChanges()
export class SidebarContentDirective {
  pageChange$ = this.rightSidebarFacade.pageChange$;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementRef: ElementRef,
    private readonly animateService: AnimateService,
    private readonly rightSidebarFacade: RightSidebarFacade,
  ) {}

  setValueChanges() {
    this.pageChange$.subscribe((id) => {
      this.vcr.clear();
      if (!id) {
        this.exitAnimation()
          .pipe(filter(Boolean))
          .subscribe(() => {
            this.vcr.clear();
          });
        const element = this.vcr.createComponent(
          PAGE_COMPONENTS[ALL_PAGES.actions].component,
        );
        this.enterAnimate(element.location.nativeElement);
        return;
      }
      const element = this.vcr.createComponent(PAGE_COMPONENTS[id].component);
      this.enterAnimate(element.location.nativeElement);
    });

    this.pageChange$.pipe(pairwise()).subscribe(([prev, curr]) => {
      if (prev != null && curr != null && prev < curr) {
        this.rightSidebarFacade.setLastPage(prev);
      }
      if (curr === 1) this.rightSidebarFacade.setLastPage(ALL_PAGES.actions);
    });
  }

  enterAnimate(element: HTMLElement) {
    const animation = SIDEBAR_ANIMATION_RIGHT_ENTER;
    this.animateService.animate(element, animation);
  }

  exitAnimation() {
    const element = this.elementRef.nativeElement.childNodes[0] as HTMLElement;

    if (!element) return EMPTY;

    const animation = SIDEBAR_ANIMATION_RIGHT_EXIT;
    return this.animateService
      .animate(element, animation)
      .pipe(map(() => true));
  }
}
