import { Component, OnInit } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {
  constructor(readonly dragAndDropService: DragAndDropService) {}

  ngOnInit() {}

  cards = Array.from({length: 1}, (_, i) => i + 1)

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event.previousContainer, event.container);
    
  }
}
