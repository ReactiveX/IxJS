import { IterableX } from '../../iterable/iterablex';
import { except } from '../../iterable/except';

/**
 * @ignore
 */
export function exceptProto<TSource>(
  this: IterableX<TSource>,
  second: Iterable<TSource>,
  comparer?: (x: TSource, y: TSource) => boolean
): IterableX<TSource> {
  return except(this, second, comparer);
}

IterableX.prototype.except = exceptProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    except: typeof exceptProto;
  }
}
