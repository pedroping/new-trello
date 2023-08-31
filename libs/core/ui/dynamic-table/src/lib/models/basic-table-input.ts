import { Injectable, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DefaultInput, ITableColumn } from "./table";
import { Subject } from "rxjs";

@Injectable()
export abstract class BasicTableInput<T> implements DefaultInput<T>, OnDestroy {

    tableElement!: T
    selector!: keyof T
    formControl!: FormControl
    columnOption!: ITableColumn<T>

    destroy$ = new Subject<boolean>()

    constructor() { }

    setValueChanges() {
        this.formControl.setValue(this.tableElement[this.selector])

        this.formControl.valueChanges.subscribe(value => {
            this.tableElement[this.selector] = value
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
    }

}