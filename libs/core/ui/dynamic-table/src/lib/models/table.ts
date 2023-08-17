import { Type } from "@angular/core"
import { FormControl } from "@angular/forms"

export interface ITableColumn<T> {
    label: string
    selector: string
    hasCustomField?: boolean
    component?: Type<DefaultInput<T>>
}

export interface ITableConfig<T> {
    columns: ITableColumn<T>[]
    hasPaginator: boolean;
    hasExpansion: boolean
    paginatorOptions?: IPaginatorOptions
}
export interface IPaginatorOptions {
    pageSize: number
    pageSizeOptions: number[]
}
export interface DefaultInput<T> {
    tableElement: T
    selector: keyof T
    formControl: FormControl
}