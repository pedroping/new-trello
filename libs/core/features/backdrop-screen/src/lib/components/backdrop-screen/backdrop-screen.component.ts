import { Component } from '@angular/core';
import { BackdropStateService } from '../../services/backdrop-state.service';

@Component({
  selector: 'backdrop-screen',
  templateUrl: './backdrop-screen.component.html',
  styleUrls: ['./backdrop-screen.component.scss'],
})
export class BackdropScreenComponent {
  backdropEventSubscription$ =
    this.backdropStateService.backDropEventSubscription$;
  constructor(readonly backdropStateService: BackdropStateService) {}
}
