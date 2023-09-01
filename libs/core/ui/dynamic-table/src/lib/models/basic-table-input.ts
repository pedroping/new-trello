import { Injectable, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { DefaultInput, ITableColumn } from "./table";

@Injectable({
    providedIn: 'root'
})
export abstract class BasicTableInput<T> implements DefaultInput<T>, OnDestroy {

    tableElement!: T
    selector!: keyof T
    formControl!: FormControl
    columnOption!: ITableColumn<T>

    destroy$ = new Subject<boolean>()

    constructor() { }

    setValueChanges() {
        this.formControl = new FormControl()
        this.formControl.setValue(this.tableElement[this.selector])

        this.formControl.valueChanges.subscribe(value => {
            this.tableElement[this.selector] = value
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
    }

    buildElement() {
        this.setValueChanges()

        const element = this.tableElement as T & {
            id: number
        }

        const valueChanges$ = this.formControl.valueChanges.pipe(takeUntil(this.destroy$))

        if (this.columnOption?.controlsOptions) {

            if (this.columnOption?.controlsOptions?.controls) {
                this.columnOption.controlsOptions.controls[element.id] = this.formControl
            }
            this.columnOption?.controlsOptions.getValueChanges(valueChanges$, element.id, element, this.selector)
        }
    }

}