import { Component, OnInit } from '@angular/core';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table';
import { COLUMNS, DATA } from '../../helpers/table-mocks';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import {
  CoreFeaturesDynamicFormsModule,
  IInputBuilder,
} from '@my-monorepo/core/features/dynamic-forms';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  standalone: true,
  imports: [
    CoreUiDynamicTableModule,
    CommonModule,
    CoreFeaturesDynamicFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DynamicTableComponent implements OnInit {
  colums = COLUMNS;
  data$ = of(DATA);

  form = new FormGroup({
    teste: new FormControl(),
  });

  formsConfig: IInputBuilder<any>[] = [
    {
      label: 'Teste',
      placeholder: 'Teste',
      formName: 'teste',
      type: 'text',
      appearance: 'outline',
      isBasicInput: true,
      inputName: 'basicInput',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
