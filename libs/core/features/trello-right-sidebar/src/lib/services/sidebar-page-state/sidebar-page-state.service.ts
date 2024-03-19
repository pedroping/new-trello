import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ALL_PAGES } from '../../models/all-pages';

@Injectable({ providedIn: 'root' })
export class SidebarPageStateService {
  actualPage$ = new BehaviorSubject<number | null>(ALL_PAGES.actions);
}
