import { IterableX } from '../../iterable/iterablex';
import { except } from '../../iterable/operators/except';

/**
 * @ignore
 */
export function exceptProto<T>(
  this: IterableX<T>,
  second: Iterable<T>,
  comparer?: (x: T, y: T) => boolean
): IterableX<T> {
  return except(second, comparer)(this);
}

IterableX.prototype.except = exceptProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    except: typeof exceptProto;
  }
}
