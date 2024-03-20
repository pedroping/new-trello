import { AnimationBuilder, AnimationMetadata } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimateService {
  constructor(private readonly builder: AnimationBuilder) {}
  animate(
    element: HTMLElement,
    animation: AnimationMetadata[] | AnimationMetadata,
  ) {
    const factory = this.builder.build(animation);
    const player = factory.create(element);
    player.play();
  }
}
