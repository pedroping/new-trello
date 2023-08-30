import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SelectedRowService } from '../../service/selected-row.service';

@Directive({
  selector: '[appHasElement]',
})
export class HasElementDirective<T> implements OnInit {
  @Input('appHasElement') rowElement!: T;

  lasState = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
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

    if (isSelectedRow != this.lasState) {
      this.lasState = isSelectedRow;
      this.viewContainer.clear();
      if (isSelectedRow)
        this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
