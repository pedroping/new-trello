import { CardMocksService } from '../services/card-mocks/card-mocks.service';

export function ClearMocks() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const cardMocks = this['injector']?.get(CardMocksService);
      if (!cardMocks)
        throw new Error(
          'card Mocks service not Found, Try to inject the service or set the injector property'
        );
      cardMocks.clearMocks();
      original?.apply(this);
    };
  };
}
