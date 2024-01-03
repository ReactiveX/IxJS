import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { except } from '../../asynciterable/operators/except.js';

/**
 * @ignore
 */
export function exceptProto<T>(
  this: AsyncIterableX<T>,
  second: AsyncIterable<T>,
  comparer?: (x: T, y: T) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return except<T>(second, comparer)(this);
}

AsyncIterableX.prototype.except = exceptProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    except: typeof exceptProto;
  }
}
