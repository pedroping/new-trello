export function CallSetValueChanges() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function () {
      constructor.prototype.setValueChanges?.apply(this);
      original?.apply(this);
    };
  };
}
