import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
