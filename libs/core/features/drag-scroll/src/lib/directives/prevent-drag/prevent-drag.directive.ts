import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { DragElementsService } from '../../services/drag-elements-service/drag-elements.service';

@Directive({
  selector: '[preventDrag]',
  standalone: true,
})
export class PreventDragDirective implements AfterViewInit {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly dragElementsService: DragElementsService,
  ) {}

  ngAfterViewInit(): void {
    this.dragElementsService.elements.push(this.elementRef.nativeElement);
  }
}
