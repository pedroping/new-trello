import { Directive, ViewContainerRef } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { RightSidebarActionsComponent } from '../../components/right-sidebar-actions/right-sidebar-actions.component';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES, PAGE_COMPONENTS } from '../../models/all-pages';

@Directive({
  selector: 'sidebar-content',
  standalone: true,
})
@CallSetValueChanges()
export class SidebarContentDirective {
  pageChange$ = this.rightSidebarFacade.pageChange$;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly rightSidebarFacade: RightSidebarFacade,
  ) {}

  setValueChanges() {
    this.pageChange$.subscribe((id) => {
      this.vcr.clear();
      if (!id) {
        this.vcr.createComponent(PAGE_COMPONENTS[ALL_PAGES.actions]);
        return;
      }

      this.vcr.createComponent(PAGE_COMPONENTS[id]);
    });
  }
}
