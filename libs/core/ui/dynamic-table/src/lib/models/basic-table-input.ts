import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DefaultInput, ITableColumn } from './table';

@Injectable()
@UntilDestroy()
export abstract class BasicTableInput<T>
  implements Omit<DefaultInput<T>, 'ngOnInit'>
{
  tableElement!: T;
  selector!: keyof T;
  formControl!: FormControl;
  columnOption!: ITableColumn<T>;

  constructor() {}

  setValueChanges() {
    this.formControl = new FormControl();
    this.formControl.setValue(this.tableElement[this.selector]);

    this.formControl.valueChanges.subscribe((value) => {
      this.tableElement[this.selector] = value;
    });
  }

  buildElement() {
    this.setValueChanges();

    const element = this.tableElement as T & {
      id: number;
    };

    const valueChanges$ = this.formControl.valueChanges.pipe(
      untilDestroyed(this),
    );

    const controlsOptions = this.columnOption?.controlsOptions;

    if (controlsOptions) {
      if (controlsOptions?.controls) {
        controlsOptions.controls[element.id] = this.formControl;
      }

      controlsOptions.getValueChanges(
        valueChanges$,
        element.id,
        element,
        this.selector,
      );
    }
  }
}
