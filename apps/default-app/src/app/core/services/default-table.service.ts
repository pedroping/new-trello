import { Injectable } from '@angular/core';

import {
  IBaseTableFather,
  IBaseTableService,
  ITableConfig,
} from '@my-monorepo/core/ui/dynamic-table';
import { BehaviorSubject } from 'rxjs';
import { CREATE_TABLE_CONFIG } from '../../domain/dynamic-table/helpers/table-mocks';

@Injectable({ providedIn: 'root' })
export class DefaultTableService<T> implements IBaseTableService<T> {
  tableConfig!: ITableConfig<T>;
  data$!: BehaviorSubject<T[]>;

  createTableConfig(father: IBaseTableFather<T>) {
    const tableConfig = CREATE_TABLE_CONFIG<T>(father);
    this.tableConfig = tableConfig;
    return tableConfig;
  }

  createData(data: T[]) {
    this.data$ = new BehaviorSubject<T[]>(data);
    return this.data$;
  }
}
