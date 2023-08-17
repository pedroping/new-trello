import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CoreFeaturesDynamicFormsModule,
  IInputBuilder,
} from '@my-monorepo/core/features/dynamic-forms';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table';
import { of } from 'rxjs';
import { DATA, TABLE_CONFIG } from '../../helpers/table-mocks';
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
  tableConfig = TABLE_CONFIG;
  data$ = of(DATA);

  form = new FormGroup({
    teste: new FormControl('aaa'),
  });

  formsConfig: IInputBuilder<unknown>[] = [
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

  constructor() { }

  ngOnInit() { }
}
