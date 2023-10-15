import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ITableColumn } from '../models/table';

@Directive({
  selector: '[appGenerateCustomField]',
})
export class GenerateCustomFieldDirective<T> implements OnInit {
  @Input({ required: true }) element!: T;
  @Input({ required: true }) selector!: keyof T;
  @Input({ required: true }) column!: ITableColumn<T>;

  constructor(private readonly vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.vcr.clear();
    if (this.column.component) {
      const component = this.vcr.createComponent(this.column.component);
      component.instance.selector = this.selector;
      component.instance.tableElement = this.element;
      component.instance.columnOption = this.column;
    }
  }
}
