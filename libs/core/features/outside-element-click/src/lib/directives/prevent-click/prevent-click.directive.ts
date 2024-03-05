import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { ElementsService } from '../../services/elements.service';

@Directive({
  selector: '[preventClick]',
  standalone: true,
})
export class PreventClickDirective implements AfterViewInit {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly elementsService: ElementsService,
  ) {}

  ngAfterViewInit(): void {
    this.elementsService.elements.push(this.elementRef.nativeElement);
  }
}
