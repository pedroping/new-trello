import { CardMocksService } from '../services/card-mocks/card-mocks.service';

export function ClearMocks() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const cardMocks = this['injector'].get(CardMocksService);
      cardMocks.clearMocks();
      original?.apply(this, arguments);
    };
  };
}
