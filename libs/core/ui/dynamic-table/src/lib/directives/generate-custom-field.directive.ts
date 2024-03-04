import { Directive, OnInit, ViewContainerRef, input } from '@angular/core';
import { Subject } from 'rxjs';
import { ITableColumn } from '../models/table';

@Directive({
  selector: '[appGenerateCustomField]',
  standalone: true,
})
export class GenerateCustomFieldDirective<T> implements OnInit {
  element = input.required<T>();
  selector = input.required<keyof T>();
  column = input.required<ITableColumn<T>>();

  elementChange$ = new Subject<void>();

  constructor(private readonly vcr: ViewContainerRef) {}

  ngOnInit(): void {
    if (!this.column().component) return;
    this.vcr.clear();
    const component = this.vcr.createComponent(this.column().component!);
    component.instance.selector = this.selector();
    component.instance.tableElement = this.element();
    component.instance.columnOption = this.column();
  }
}
