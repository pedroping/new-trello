import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() isPreview?: boolean;

  constructor() {}

  ngOnInit() {}
}
