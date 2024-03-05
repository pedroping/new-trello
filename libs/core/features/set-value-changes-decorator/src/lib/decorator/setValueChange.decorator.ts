import { runInInjectionContext } from '@angular/core';

export function CallSetValueChanges() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnInit;
    constructor.prototype.ngOnInit = function () {
      if (this['injector']) {
        runInInjectionContext(this['injector'], () => {
          constructor.prototype.setValueChanges?.apply(this);
          original?.apply(this);
        });
        return;
      }
      constructor.prototype.setValueChanges?.apply(this);
      original?.apply(this);
    };
  };
}
