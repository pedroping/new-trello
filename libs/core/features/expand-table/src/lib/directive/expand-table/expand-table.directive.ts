import { Directive, HostBinding, HostListener, input } from '@angular/core';
import { SelectedRowService } from '../../service/selected-row.service';

@Directive({
  selector: '[expandTable]',
  standalone: true,
})
export class ExpandTableDirective<T> {
  rowElement = input.required<T>();

  @HostBinding('class.expand-detail-row') get ExpandTable() {
    const actualRow = this.selectedRowService.selectedRows$.value;
    return actualRow.includes(this.rowElement());
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id !== 'expandIcon') return;

    const actualRow = this.selectedRowService.selectedRows$.value;
    if (actualRow.includes(this.rowElement())) {
      this.selectedRowService.selectedRows$.next(
        actualRow.filter((item) => item != this.rowElement()),
      );
      return;
    }
    this.selectedRowService.selectedRows$.next([
      ...actualRow,
      this.rowElement(),
    ]);
  }

  constructor(private readonly selectedRowService: SelectedRowService<T>) {}
}
