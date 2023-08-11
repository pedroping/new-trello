import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicTableInput } from '@my-monorepo/core/ui/dynamic-table';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule]
})
export class BasicInputComponent extends BasicTableInput<unknown> implements OnInit {

  override formControl = new FormControl();

  ngOnInit() {
    this.setValueChanges()
  }

}
