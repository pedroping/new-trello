import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { OnlineOfflineStateService } from '@my-monorepo/core/features/online-offline-managemante';
import { map } from 'rxjs';

@Component({
  selector: 'app-online-offline-state',
  templateUrl: './online-offline-state.component.html',
  styleUrls: ['./online-offline-state.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class OnlineOfflineStateComponent implements OnInit {
  private readonly onlineOfflineStateService = inject(
    OnlineOfflineStateService,
  );

  stateChanges$ = this.onlineOfflineStateService.stateChanges$.pipe(
    map((state) => (state ? 'Online' : 'Offline')),
  );

  ngOnInit() {}
}
