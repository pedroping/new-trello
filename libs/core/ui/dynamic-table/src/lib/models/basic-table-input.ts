import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DefaultInput, ITableColumn } from "./table";

@Injectable()
export abstract class BasicTableInput<T> implements DefaultInput<T>{

    tableElement!: T
    selector!: keyof T
    formControl!: FormControl
    columnOption!: ITableColumn<T>

    constructor() {

    }

    setValueChanges() {
        this.formControl.setValue(this.tableElement[this.selector])

        this.formControl.valueChanges.subscribe(value => {
            this.tableElement[this.selector] = value
        })
    }

}