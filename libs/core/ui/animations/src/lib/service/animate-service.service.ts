import { AnimationBuilder, AnimationMetadata } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimateService {
  constructor(private readonly builder: AnimationBuilder) {}
  animate(
    element: HTMLElement,
    animation: AnimationMetadata[] | AnimationMetadata,
  ) {
    const onDone$ = new Subject<void>();
    const factory = this.builder.build(animation);
    const player = factory.create(element);
    player.play();

    player.onDone = () => {
      onDone$.next();
    };

    return onDone$.asObservable();
  }
}
