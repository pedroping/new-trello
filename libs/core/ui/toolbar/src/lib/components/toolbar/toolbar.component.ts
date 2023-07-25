import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  menuEvent$: BehaviorSubject<boolean>;

  constructor(private readonly ToolbarService: ToolbarService) {
    this.menuEvent$ = this.ToolbarService.menuEvent$;
  }

  ngOnInit() {
    this.menuEvent$.subscribe(console.log);
  }

  emitEvent() {
    this.menuEvent$.next(!this.menuEvent$.value);
  }
}
