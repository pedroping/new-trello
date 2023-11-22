import { Component } from '@angular/core';
import { BackdropStateService } from '../../services/backdrop-state/backdrop-state.service';

@Component({
  selector: 'backdrop-screen',
  templateUrl: './backdrop-screen.component.html',
  styleUrls: ['./backdrop-screen.component.scss'],
})
export class BackdropScreenComponent {
  backDropSubscription$ = this.backdropStateService.backDropSubscription$;
  constructor(private readonly backdropStateService: BackdropStateService) {}
}
