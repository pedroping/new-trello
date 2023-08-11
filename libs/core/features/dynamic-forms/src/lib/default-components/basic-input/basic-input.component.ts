import { Component, Input, OnInit } from '@angular/core';
import { IComponentBase, IInputBuilder } from '../../models/models';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent<T> implements OnInit, IComponentBase<T> {

  @Input({ required: true }) config!: IInputBuilder<T>

  constructor() { }

  ngOnInit() {
  }

}
