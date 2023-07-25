import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  menuEvent$ = new BehaviorSubject<boolean>(false);
  constructor() {}
}
