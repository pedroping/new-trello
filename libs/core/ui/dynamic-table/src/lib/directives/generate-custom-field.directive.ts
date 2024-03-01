import { Directive, OnInit, ViewContainerRef, input } from '@angular/core';
import { ITableColumn } from '../models/table';

@Directive({
  selector: '[appGenerateCustomField]',
  standalone: true,
})
export class GenerateCustomFieldDirective<T> implements OnInit {
  element = input.required<T>();
  selector = input.required<keyof T>();
  column = input.required<ITableColumn<T>>();

  constructor(private readonly vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.vcr.clear();
    if (this.column().component) {
      const component = this.vcr.createComponent(this.column().component!);
      component.instance.selector = this.selector();
      component.instance.tableElement = this.element();
      component.instance.columnOption = this.column();
    }
  }
}
