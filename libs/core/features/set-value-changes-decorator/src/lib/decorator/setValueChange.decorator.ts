import { runInInjectionContext } from '@angular/core';

export function CallSetValueChanges() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnInit;
    constructor.prototype.ngOnInit = function () {
      if (this['injector']) {
        runInInjectionContext(this['injector'], () => {
          original?.apply(this);
          constructor.prototype.setValueChanges?.apply(this);
        });
        return;
      }
      original?.apply(this);
      constructor.prototype.setValueChanges?.apply(this);
    };
  };
}
