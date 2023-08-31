import {
  Directive,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SelectedRowService } from '../../service/selected-row.service';

export const UP_ICON = 'keyboard_arrow_up';
export const DOWN_ICON = 'keyboard_arrow_down';
@Directive({
  selector: '[appHasElement]',
  exportAs: 'appHasElement',
})
export class HasElementDirective<T> implements OnInit {
  @Input('appHasElement') rowElement!: T;

  lasState = false;
  expandedIcon = DOWN_ICON;

  constructor(
    @Optional() private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private selectedRowService: SelectedRowService<T>
  ) {}

  ngOnInit(): void {
    this.ngIf();
    this.selectedRowService.selectedRows$.subscribe(this.ngIf.bind(this));
  }

  ngIf() {
    const isSelectedRow = this.selectedRowService.selectedRows$.value.includes(
      this.rowElement
    );
    this.expandedIcon = isSelectedRow ? UP_ICON : DOWN_ICON;

    if (isSelectedRow != this.lasState) {
      this.lasState = isSelectedRow;
      if (!this.templateRef) return;
      this.viewContainer.clear();
      if (isSelectedRow)
        this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
