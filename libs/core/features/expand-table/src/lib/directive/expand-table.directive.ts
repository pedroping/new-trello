import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { SelectedRowService } from '../service/selected-row.service';

@Directive({
  selector: '[expandTable]'
})
export class ExpandTableDirective<T> {

  @Input({ required: true }) rowElement!: T

  @HostBinding('class.expand-detail-row') get ExpandTable() {
    const actualRow = this.selectedRowService.selectedRows$.value
    return actualRow.includes(this.rowElement)
  }

  @HostListener('click') onClick() {
    const actualRow = this.selectedRowService.selectedRows$.value
    if (actualRow.includes(this.rowElement)) {
      this.selectedRowService.selectedRows$.next(actualRow.filter(item => item != this.rowElement))
      return
    }
    this.selectedRowService.selectedRows$.next([...actualRow, this.rowElement])
  }

  constructor(private readonly selectedRowService: SelectedRowService<T>) { }

}
