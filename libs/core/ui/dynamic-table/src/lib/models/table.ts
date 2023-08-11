import { Type } from "@angular/core"
import { FormControl } from "@angular/forms"

export interface ITableColumn<T> {
    label: string
    selector: string
    hasCustomField?: boolean
    component?: Type<DefaultInput<T>>
}

export interface DefaultInput<T> {
    tableElement: T
    selector: keyof T
    formControl: FormControl
}