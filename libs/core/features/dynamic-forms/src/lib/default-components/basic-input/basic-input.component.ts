import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CoreFeaturesFormErrorModule } from '@my-monorepo/core/features/form-error';
import { DefaultFormInput } from '../../models/defaultInput';
import { IBaseInput, IComponentBase } from '../../models/models';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CoreFeaturesFormErrorModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BasicInputComponent
  extends DefaultFormInput<IBaseInput>
  implements IComponentBase<IBaseInput>
{
  constructor() {
    super();
  }
}
