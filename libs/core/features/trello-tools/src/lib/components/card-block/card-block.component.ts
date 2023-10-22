import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {
  @Input() isPreview = false;
  @Input() title = '';
  @Input() cards: number[] = [];
  @Input() id = -1;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isSelectedBlock = false;

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addNewEvent$.subscribe(() => console.log('Add new on ' + this.id));
  }

  cardMove(event: boolean) {
    this.isSelectedBlock = event;
  }
}
