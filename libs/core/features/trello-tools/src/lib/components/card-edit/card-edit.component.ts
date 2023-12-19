import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { OutsideClickEventsService } from '@my-monorepo/core/utlis';
import { Subscription, filter, fromEvent, skip, take } from 'rxjs';
import { Icard } from '../../models/card.models';

@Component({
  selector: 'card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
@CallSetValueChanges()
export class CardEditComponent implements OnInit {
  @ViewChild('nameInput') set inputFocus(input: ElementRef<HTMLInputElement>) {
    if (!input) return;
    input.nativeElement.focus({ preventScroll: true });
  }

  @ViewChild('menu') menu?: TemplateRef<unknown>;

  @Input({ required: true }) card?: Icard;
  @Input({ required: true }) cards: Icard[] = [];

  cardNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  overlayRef: OverlayRef | null | undefined;
  sub?: Subscription;

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly backdropStateService: BackdropStateService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  ngOnInit(): void {
    if (!this.card) return;
    this.cardNameControl.setValue(this.card.name);
  }

  openMenu(element: HTMLElement) {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    const rect = element.getBoundingClientRect();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: rect.left + rect.width + 5, y: rect.top })
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
    });

    this.overlayRef.attach(
      new TemplatePortal(this.menu!, this.viewContainerRef)
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        skip(1),
        take(1)
      )
      .subscribe(this.closeElement.bind(this));
  }

  setValueChanges() {
    const outSideClick$$ = this.outsideClickEventsService.outSideClick$$;

    outSideClick$$.subscribe(() => {
      this.backdropStateService.setBackDropState();
    });
  }

  closeElement() {
    this.sub?.unsubscribe();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  addCard() {
    if (this.cardNameControl.invalid) return;
    if (!this.card) return this.closeEdit();
    this.card.name = this.cardNameControl.value;
    this.closeEdit();
  }

  closeEdit() {
    this.backdropStateService.setBackDropState();
  }

  archive() {
    if (!this.card) return;
    const index = this.cards.findIndex((card) => card.id === this.card?.id);
    this.cards.splice(index, 1);
    this.backdropStateService.setBackDropState();
  }
}
