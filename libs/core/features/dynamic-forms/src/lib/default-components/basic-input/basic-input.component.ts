import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultFormInput } from '../../models/defaultInput';
import { IBaseInput, IComponentBase } from '../../models/models';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule],
})
export class BasicInputComponent
  extends DefaultFormInput<IBaseInput>
  implements OnInit, IComponentBase<IBaseInput>
{
  constructor() {
    super();
  }

  ngOnInit() {}
}
