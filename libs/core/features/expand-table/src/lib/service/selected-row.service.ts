import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedRowService<T> {

    selectedRows$ = new BehaviorSubject<T[]>([])

    constructor() { }
}
