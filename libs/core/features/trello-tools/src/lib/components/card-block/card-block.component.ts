import { Component, OnInit } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {
  constructor(readonly dragAndDropService: DragAndDropService) {}

  ngOnInit() {}

  cards = Array.from({ length: 5 }, (_, i) => i + 1);
  drop = this.dragAndDropService.drop;
}
