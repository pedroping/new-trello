import {
  Directive,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SelectedRowService } from '../../service/selected-row.service';

export const UP_ICON = 'expanded';
export const DOWN_ICON = 'collapsed';
@Directive({
  selector: '[appHasElement]',
  exportAs: 'appHasElement',
})
export class HasElementDirective<T> implements OnInit {
  @Input('appHasElement') rowElement!: T;

  private lasState = false;
  iconState = DOWN_ICON;

  constructor(
    @Optional() private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private selectedRowService: SelectedRowService<T>
  ) {}

  ngOnInit(): void {
    this.ngIf();
    this.selectedRowService.selectedRows$.subscribe(this.ngIf.bind(this));
  }

  private ngIf() {
    const isSelectedRow = this.selectedRowService.selectedRows$.value.includes(
      this.rowElement
    );
    this.iconState = isSelectedRow ? UP_ICON : DOWN_ICON;

    if (isSelectedRow != this.lasState) {
      this.lasState = isSelectedRow;
      if (!this.templateRef) return;
      this.viewContainer.clear();
      if (isSelectedRow)
        this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
